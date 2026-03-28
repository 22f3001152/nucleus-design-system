@description('Azure region for the storage account')
param location string = resourceGroup().location

@description('Storage account name (must be globally unique, 3-24 chars, lowercase letters and numbers only)')
@minLength(3)
@maxLength(24)
param storageAccountName string

@description('Storage account SKU')
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_ZRS'
  'Premium_LRS'
])
param skuName string = 'Standard_LRS'

@description('Enable static website hosting')
param enableStaticWebsite bool = true

@description('Index document for static website')
param indexDocument string = 'index.html'

@description('Error document for static website')
param errorDocument string = '404.html'

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: skuName
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: true
    networkAcls: {
      bypass: 'AzureServices'
      defaultAction: 'Allow'
    }
  }
}

resource blobServices 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = if (enableStaticWebsite) {
  parent: storageAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['GET', 'HEAD', 'OPTIONS']
          allowedHeaders: ['*']
          exposedHeaders: ['*']
          maxAgeInSeconds: 3600
        }
      ]
    }
  }
}

// Enable static website hosting
resource staticWebsite 'Microsoft.Storage/storageAccounts/fileServices@2023-01-01' = if (enableStaticWebsite) {
  parent: storageAccount
  name: 'default'
}

@description('Storage account ID')
output id string = storageAccount.id

@description('Storage account name')
output name string = storageAccount.name

@description('Primary blob endpoint')
output primaryBlobEndpoint string = storageAccount.properties.primaryEndpoints.blob

@description('Static website primary endpoint')
output staticWebsiteUrl string = enableStaticWebsite ? storageAccount.properties.primaryEndpoints.web : ''

@description('Storage account key (sensitive)')
output storageAccountKey string = storageAccount.listKeys().keys[0].value
