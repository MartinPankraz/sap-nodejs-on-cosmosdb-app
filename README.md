# Azure Cosmos DB with SAP Private Link quickstart sample

Example project showcasing a resilient **multi-region** app on SAP BTP powered by globally distributed **Azure Cosmos DB**. App was built upon the SAP Developer tutorial [Create a Node.js Application via Cloud Foundry Command Line Interface](https://developers.sap.com/tutorials/btp-cf-buildpacks-node-create.html) and the SAP Private Link for [CosmosDB](https://help.sap.com/docs/PRIVATE_LINK/42acd88cb4134ba2a7d3e0e62c9fe6cf/663ed5631cfd4ef0a4bd89ca00266943.html). It relies on [Express](https://expressjs.com/) for minimal server setup.

## Getting started 🚀

Create `SampleDB` from **Quick Launch wizard** in Cosmos DB on the [Azure portal](https://portal.azure.com/?feature.customportal=false#view/HubsExtension/BrowseResource/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts).

Create a [SAP Private Link for Cosmos DB](https://help.sap.com/docs/PRIVATE_LINK/42acd88cb4134ba2a7d3e0e62c9fe6cf/663ed5631cfd4ef0a4bd89ca00266943.html) named cosmos-pls or rename service in [manifest.yml](manifest.yml)

```javascript
cd app
npm install
npm start
```

Navigate to the addresses tab and enjoy the private response from Cosmos🪐☄️

## Deploy to BTP 🪂

Adjust route in manifest.yml as per [SAP's recommendation](https://developers.sap.com/tutorials/btp-cf-buildpacks-node-create.html) in step 2.

```cmd
cf push
```

## Full blown setup 🌏

<img src="img/cosmos-pls-overview.png" alt="architecture overview with emphasis on global deployment" width="200"/>

## Contributions and community work 👩🏼‍🤝‍👨🏽

Follow [this thread](https://github.com/sapmentors/cds-pg/issues/355) to stay up to date with CDS for Azure CosmosDB and SAP CAP driven by the amazing SAP Mentors.
