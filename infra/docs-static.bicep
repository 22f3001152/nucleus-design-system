targetScope = 'resourceGroup'

@description('Azure region for all resources')
param location string = resourceGroup().location

@description('Storage account name for docs hosting (must be globally unique)')
@minLength(3)
@maxLength(24)
param storageAccountName string

@description('Storage account SKU')
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_ZRS'
])
param storageSku string = 'Standard_LRS'

module storageAccount './modules/storage-account.bicep' = {
  name: 'docsStorageAccount'
  params: {
    location: location
    storageAccountName: storageAccountName
    skuName: storageSku
    enableStaticWebsite: true
    indexDocument: 'index.html'
    errorDocument: '404.html'
  }
}

@description('Storage account name')
output storageAccountName string = storageAccount.outputs.name

@description('Static website URL')
output staticWebsiteUrl string = storageAccount.outputs.staticWebsiteUrl

@description('Primary blob endpoint')
output primaryBlobEndpoint string = storageAccount.outputs.primaryBlobEndpoint
