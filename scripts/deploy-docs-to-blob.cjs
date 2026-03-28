#!/usr/bin/env node

/**
 * Deploy Jekyll documentation site to Azure Blob Storage
 * 
 * Prerequisites:
 * - Azure CLI installed and authenticated
 * - Storage account created with static website enabled
 * - Jekyll site built to docs/_site/
 * 
 * Environment variables:
 * - AZURE_RESOURCE_GROUP: Azure resource group name (required)
 * - AZURE_STORAGE_ACCOUNT: Storage account name (required)
 * - AZURE_ENV: Environment (dev/prod, optional, defaults to 'dev')
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const DOCS_DIR = path.join(__dirname, '..', 'docs', '_site');
const RESOURCE_GROUP = process.env.AZURE_RESOURCE_GROUP;
const STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT;
const AZURE_ENV = process.env.AZURE_ENV || 'dev';

function log(message) {
  console.log(`[deploy-docs] ${message}`);
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
    log('ERROR: AZURE_STORAGE_ACCOUNT environment variable not set');
    log('Set it with: export AZURE_STORAGE_ACCOUNT=your-storage-account');
    process.exit(1);
  }
  
  // Check if Jekyll site is built
  if (!fs.existsSync(DOCS_DIR)) {
    log('ERROR: Jekyll site not built. Run: npm run docs:blog:build');
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
  log(`Uploading Jekyll site from ${DOCS_DIR}...`);
  
  // Upload all files to $web container
  const command = `az storage blob upload-batch \
    --account-name ${STORAGE_ACCOUNT} \
    --source "${DOCS_DIR}" \
    --destination '$web' \
    --auth-mode key \
    --overwrite \
    --content-cache-control "public, max-age=3600"`;
  
  exec(command);
  log('Files uploaded ✓');
}

function setContentTypes() {
  log('Setting content types for specific files...');
  
  // Set content type for CSS files
  exec(`az storage blob update \
    --account-name ${STORAGE_ACCOUNT} \
    --container-name '$web' \
    --name 'assets/main.css' \
    --content-type 'text/css' \
    --auth-mode key \
    || true`);
  
  // Set content type for JS files (if any)
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
  log(`📄 Documentation URL: ${url}`);
  log(`📂 Resource Group: ${RESOURCE_GROUP}`);
  log(`📂 Storage Account: ${STORAGE_ACCOUNT}`);
  log(`📂 Blob Container: $web`);
  
  return url;
}

function main() {
  log('Starting Jekyll docs deployment to Azure Blob Storage\n');
  
  validatePrerequisites();
  enableStaticWebsite();
  uploadFiles();
  setContentTypes();
  getWebsiteUrl();
  
  log('\n🎉 Deployment successful!');
}

main();
