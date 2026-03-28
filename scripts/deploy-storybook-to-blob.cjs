#!/usr/bin/env node

/**
 * Deploy Storybook bundle to Azure Blob Storage
 * 
 * Prerequisites:
 * - Azure CLI installed and authenticated
 * - Storage account created with static website enabled
 * - Storybook bundle built to .deploy/storybook-bundle/
 * 
 * Environment variables:
 * - AZURE_RESOURCE_GROUP: Azure resource group name (required)
 * - AZURE_STORAGE_ACCOUNT: Storage account name (required)
 * - AZURE_ENV: Environment (dev/prod, optional, defaults to 'dev')
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const STORYBOOK_DIR = path.join(__dirname, '..', '.deploy', 'storybook-bundle');
const RESOURCE_GROUP = process.env.AZURE_RESOURCE_GROUP;
const STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT_STORYBOOK || process.env.AZURE_STORAGE_ACCOUNT;
const AZURE_ENV = process.env.AZURE_ENV || 'dev';

function log(message) {
  console.log(`[deploy-storybook] ${message}`);
}

function exec(command) {
  log(`Executing: ${command}`);
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
  } catch (error) {
    log(`Error executing command: ${error.message}`);
    process.exit(1);
  }
}

function validatePrerequisites() {
  log('Validating prerequisites...');
  
  // Check required environment variables
  if (!RESOURCE_GROUP) {
    log('ERROR: AZURE_RESOURCE_GROUP environment variable not set');
    log('Set it with: export AZURE_RESOURCE_GROUP=your-resource-group');
    process.exit(1);
  }
  
  if (!STORAGE_ACCOUNT) {
    log('ERROR: AZURE_STORAGE_ACCOUNT_STORYBOOK (or AZURE_STORAGE_ACCOUNT) environment variable not set');
    log('Set it with: export AZURE_STORAGE_ACCOUNT_STORYBOOK=your-storage-account');
    process.exit(1);
  }
  
  // Check if Storybook bundle is built
  if (!fs.existsSync(STORYBOOK_DIR)) {
    log('ERROR: Storybook bundle not built. Run: npm run build-storybook:bundle');
    process.exit(1);
  }
  
  // Check if Azure CLI is available
  try {
    execSync('az --version', { stdio: 'ignore' });
  } catch {
    log('ERROR: Azure CLI not found. Install from https://aka.ms/install-azure-cli');
    process.exit(1);
  }
  
  log(`Environment: ${AZURE_ENV}`);
  log(`Resource Group: ${RESOURCE_GROUP}`);
  log(`Storage Account: ${STORAGE_ACCOUNT}`);
  log('Prerequisites validated ✓');
}

function enableStaticWebsite() {
  log('Enabling static website hosting...');
  
  const command = `az storage blob service-properties update \
    --account-name ${STORAGE_ACCOUNT} \
    --static-website \
    --index-document index.html \
    --404-document 404.html \
    --auth-mode login`;
  
  exec(command);
  log('Static website hosting enabled ✓');
}

function uploadFiles() {
  log(`Uploading Storybook bundle from ${STORYBOOK_DIR}...`);
  
  // Upload all files to $web container
  const command = `az storage blob upload-batch \
    --account-name ${STORAGE_ACCOUNT} \
    --source "${STORYBOOK_DIR}" \
    --destination '$web' \
    --auth-mode key \
    --overwrite \
    --content-cache-control "public, max-age=3600"`;
  
  exec(command);
  log('Files uploaded ✓');
}

function setContentTypes() {
  log('Setting content types for specific files...');
  
  // Set content type for CSS files in both React and Angular folders
  exec(`az storage blob list \
    --account-name ${STORAGE_ACCOUNT} \
    --container-name '$web' \
    --auth-mode key \
    --query "[?ends_with(name, '.css')].name" \
    --output tsv | xargs -I {} az storage blob update \
      --account-name ${STORAGE_ACCOUNT} \
      --container-name '$web' \
      --name {} \
      --content-type 'text/css' \
      --auth-mode key \
    || true`);
  
  // Set content type for JS files
  exec(`az storage blob list \
    --account-name ${STORAGE_ACCOUNT} \
    --container-name '$web' \
    --auth-mode key \
    --query "[?ends_with(name, '.js')].name" \
    --output tsv | xargs -I {} az storage blob update \
      --account-name ${STORAGE_ACCOUNT} \
      --container-name '$web' \
      --name {} \
      --content-type 'application/javascript' \
      --auth-mode key \
    || true`);
  
  log('Content types set ✓');
}

function getWebsiteUrl() {
  log('Retrieving static website URL...');
  
  const result = execSync(
    `az storage account show \
      --name ${STORAGE_ACCOUNT} \
      --resource-group ${RESOURCE_GROUP} \
      --query "primaryEndpoints.web" \
      --output tsv`,
    { encoding: 'utf8' }
  );
  
  const url = result.trim();
  log(`\n✅ Deployment complete!`);
  log(`📄 Storybook URLs:`);
  log(`   React:   ${url}react/`);
  log(`   Angular: ${url}angular/`);
  log(`📂 Resource Group: ${RESOURCE_GROUP}`);
  log(`📂 Storage Account: ${STORAGE_ACCOUNT}`);
  log(`📂 Blob Container: $web`);
  log(`\n⚠️  Note: Storybook is now publicly accessible (no authentication)`);
  
  return url;
}

function main() {
  log('Starting Storybook deployment to Azure Blob Storage\n');
  
  validatePrerequisites();
  enableStaticWebsite();
  uploadFiles();
  setContentTypes();
  getWebsiteUrl();
  
  log('\n🎉 Deployment successful!');
}

main();
