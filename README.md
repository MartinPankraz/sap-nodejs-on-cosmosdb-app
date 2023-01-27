# Azure Cosmos DB with SAP Private Link quickstart sample

Example project showcasing a resilient **multi-region** app on SAP BTP powered by globally distributed **Azure Cosmos DB**. App was built upon the SAP Developer tutorial [Create a Node.js Application via Cloud Foundry Command Line Interface](https://developers.sap.com/tutorials/btp-cf-buildpacks-node-create.html) and the SAP Private Link for [Cosmos DB](https://help.sap.com/docs/PRIVATE_LINK/42acd88cb4134ba2a7d3e0e62c9fe6cf/663ed5631cfd4ef0a4bd89ca00266943.html). It relies on [Fastify](https://www.fastify.io/) instead of [Express](https://expressjs.com/) for a leaner setup.

This repos and associated [📝blog post](https://blogs.sap.com/2023/01/27/sap-private-linky-swear-with-azure-global-scale-with-azure-cosmos-db-with-sap-private-link/) shed light on the private connectivity aspect. To complete your resiliency journey, have a look at **intelligent routing** in this joint Microsoft+SAP [Discovery Center mission](https://discovery-center.cloud.sap/missiondetail/3603/) and this [blog post](https://blogs.sap.com/2021/06/11/sap-where-can-i-get-toilet-paper-an-implementation-of-the-geodes-pattern-with-s4-btp-and-azure-cosmosdb/).

## Getting started 🚀

Create `SampleDB` from **Quick Launch wizard** in Cosmos DB on the [Azure portal](https://portal.azure.com/?feature.customportal=false#view/HubsExtension/BrowseResource/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts).

Create a [SAP Private Link for Cosmos DB](https://help.sap.com/docs/PRIVATE_LINK/42acd88cb4134ba2a7d3e0e62c9fe6cf/663ed5631cfd4ef0a4bd89ca00266943.html) named cosmos-pls or rename service in [manifest.yml](manifest.yml)

Run SAP Business Application Stuido or compatible IDE of your choice (I like [GitHub Codespaces](https://github.com/features/codespaces) for ready to run environments).

```cmd
git clone https://github.com/MartinPankraz/sap-nodejs-on-cosmosdb-app.git
cp templates/.env app
```

Maintain your cosmos credentials in the `.env` file. From Cosmos DB UI navigate to Settings -> Keys -> read-write Keys -> Primary Key.

```cmd
cd app
npm install
npm start
```

Navigate to the addresses tab and enjoy the private response from Cosmos🪐☄️

> **Warning** - when executing **locally** you need a connection to your SAP Private Link service (remember Cosmos is not publicly reachable!). Have a look [here](https://blogs.sap.com/2021/10/05/btp-private-linky-swear-with-azure-how-do-i-debug-and-test-with-live-data/) how to use ssh with cf.

## Deploy to BTP 🪂

Adjust route in manifest.yml as per [SAP's recommendation](https://developers.sap.com/tutorials/btp-cf-buildpacks-node-create.html) in step 2.

```cmd
cf push
```

## Full blown setup 🌏

This repos sheds light on the private connectivity aspect only. Learn more about intelligent routing in this joint Microsoft+SAP [Discovery Center mission](https://discovery-center.cloud.sap/missiondetail/3603/) and this [blog post](https://blogs.sap.com/2021/06/11/sap-where-can-i-get-toilet-paper-an-implementation-of-the-geodes-pattern-with-s4-btp-and-azure-cosmosdb/).

<img src="img/cosmos-pls-overview-new.png" alt="architecture overview with emphasis on global deployment" style="width:800px;"/>

Above architecture can be considered a mix of high-availability and failover concepts. How so? The SAP Private Link in each BTP CloudFoundry space is configured to be able to reach both Cosmos regions and the app layer responds to the end-user as per the intelligent routing setting (fastest, closest etc.).

Consider the [ABAP SDK for Azure](https://github.com/microsoft/ABAP-SDK-for-Azure) for additional **direct upload** scenarios to Cosmos DB.

<img src="img/cosmos-pls-overview.png" alt="architecture overview with emphasis on global deployment" style="width:800px;"/>

Learn more about Azure IoT and Cosmos DB [here](https://learn.microsoft.com/azure/architecture/solution-ideas/articles/iot-using-cosmos-db).

## Learn more about available database spectrum for SAP Private Link scenarios

> **Note** - Database comparisons can be tedious, have many different angles and at times come across quite controversial. Therefore, below table attempts only a rough high-level overview using the smallest SKUs to fuel **your own investigation**.

| Database | Type | SAP Private Link enabled | Hosted on BTP/customer’s Azure env | Supported by [SAP CAP](https://cap.cloud.sap/docs/) natively | Price<sup>1</sup> |
|---|---|---|---|---|---|
| [HANA Cloud](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?region=all&tab=service_plan&provider=azure&commercialModel=cpea) (32GB hot storage, 1039 Capacity Units) | Managed, closed-source, in-memory db service for relational, graph, spatial and document structures | Not yet | Yes/No | Yes | 779.25€<sup>2</sup> |
| [PostgreSQL, hyperscaler option](https://discovery-center.cloud.sap/serviceCatalog/postgresql-hyperscaler-option?region=all&tab=service_plan&provider=azure&commercialModel=cpea) (4GB, premium)  | Managed, open-source object-relational db service | No, but [private VNet integration](https://help.sap.com/docs/PostgreSQL/b3fe3621fa4a4ed28d7bbe3d6d88f036/b045b64925a544689dd839266a23c89b.html?locale=en-US#features) instead | Yes/No | No, but [community offering](https://github.com/sapmentors/cds-pg) hosted by SAP Mentors | 102€ |
| [Redis, hyperscaler option](https://discovery-center.cloud.sap/serviceCatalog/redis-hyperscaler-option?region=all&tab=service_plan&provider=azure&commercialModel=cpea) (4GB, premium) | Managed, open-source in-memory data store for caching, streaming and message broker | No, but [private VNet integration](https://help.sap.com/docs/Redis/082005ec29494234a42af221bc963a67/71399a37ccba45c5b41d35f5ba9490dc.html?locale=en-US#features) instead | Yes/No | No | 241€ |
| [Azure Database for MySQL](https://learn.microsoft.com/azure/mysql/single-server/overview) - single server<sup>4</sup> | Managed, open-source, traditional relational db | [yes](https://blogs.sap.com/2022/01/12/btp-private-linky-swear-with-azure-connecting-to-cheap-paas-dbs-with-private-link-service/) | No/Yes | No, but [community offering](https://github.com/Soontao/cds-mysql) by Theo Sun | 143.92€ |
| [Azure Database for Maria DB](https://learn.microsoft.com/azure/mariadb/overview)<sup>4</sup> | Managed, open-source, traditional relational db | [yes](https://blogs.sap.com/2022/01/12/btp-private-linky-swear-with-azure-connecting-to-cheap-paas-dbs-with-private-link-service/) | No/Yes | No, but [community offering](https://github.com/Soontao/cds-mysql) by Theo Sun | 155.12€ |
| [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/introduction) (serverless, single region write, 1Mio Request Units) | Managed, closed source, NoSQL and relational database for modern app development, highly responsive, globally distributed | [yes](https://learn.microsoft.com/azure/cosmos-db/how-to-configure-private-endpoints#private-zone-name-mapping) | No/Yes | No, but in [discussion](https://github.com/sapmentors/cds-pg/issues/355) with SAP Mentors and community | <span style="color:red">**0.52€**<sup>5</sup></span> |
| [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/introduction) (provisioned throughput)<sup>3</sup> | See line before | [yes](https://learn.microsoft.com/azure/cosmos-db/how-to-configure-private-endpoints#private-zone-name-mapping) | No/Yes | No, but in [discussion](https://github.com/sapmentors/cds-pg/issues/355) with SAP Mentors and community | 110€ |
| [Azure Cosmos DB for PostgreSQL](https://learn.microsoft.com/azure/cosmos-db/postgresql/introduction) (single node, 2vCore, 8GB RAM) | Managed service for PostgreSQL extended with the Citus [open source](https://github.com/citusdata/citus) superpower of distributed tables | [Not](https://learn.microsoft.com/azure/cosmos-db/postgresql/howto-private-access) yet | No/Yes  | No, conflicts with PostgreSQL, hyperscaler option | 197.03€ |
| [Azure Cosmos DB for MongoDB](https://learn.microsoft.com/azure/cosmos-db/mongodb/introduction)<sup>3</sup> | Managed, MongoDB API compliant flavour of Cosmos | [yes](https://learn.microsoft.com/azure/cosmos-db/how-to-configure-private-endpoints#private-zone-name-mapping) | No/Yes | No | 82.50€ |
| [Azure Cosmos DB for Apache Cassandra](https://learn.microsoft.com/azure/cosmos-db/cassandra/introduction)<sup>3</sup> | Managed, Cassandra API compliant flavour of Cosmos | [yes](https://learn.microsoft.com/azure/cosmos-db/how-to-configure-private-endpoints#private-zone-name-mapping) | No/Yes | No |  82.50€ |
| [Azure Cosmos DB for Apache Gremlin](https://learn.microsoft.com/azure/cosmos-db/gremlin/introduction)<sup>3</sup> | Managed, Gremlin API compliant flavour of Cosmos, massive graph database service | [yes](https://learn.microsoft.com/azure/cosmos-db/how-to-configure-private-endpoints#private-zone-name-mapping) | No/Yes | No | 82.50€ |

Lear more about choosing an API for Azure Cosmos DB [here](https://learn.microsoft.com/azure/cosmos-db/choose-api).

<sup>1</sup> Pricing hints are based on a snapshot provided by the [SAP Estimator](https://discovery-center.cloud.sap/estimator/?commercialModel=cpea) and [Azure Pricing Calculator](https://azure.microsoft.com/pricing/calculator/) at the time of writing (9th of Jan 2023) and is meant to be a ballpark overview but by no means complete. Always verify for your individual needs at any given time. Comparison uses smallest SKU, Azure Europe (NL), CPEA (for BTP) and PAYG (for Azure)

<sup>2</sup> [HANA Cloud sizing](https://hcsizingestimator.cfapps.eu10.hana.ondemand.com/): Smallest configurable SKU on the cockpit (32GB Hot, 64GB warm, 120GB storage), Azure Europe (NL), CPEA, HANA service plan, 1039 Capacity Units

<sup>3</sup> Setup: Autoscale provisioned throughput, 1k [Request Units](https://learn.microsoft.com/azure/cosmos-db/request-units)/s, 2 regions - West Europe + East US

<sup>4</sup> General Purpose, Gen5 2 vCore

<sup>5</sup> [Request Units](https://learn.microsoft.com/azure/cosmos-db/request-units) need to be understood for a proper comparison. Also paritioning strategy impacting number of requests. If you think 50 cents is way too low or you need head room for bad query design, encourage you to increase the RUs to 100 million or more with 100GB transactional storage, which sums up to 52€ per month.

As you can see there is a variety of choice of data bases for your BTP app with different capabilities and implications. The associated [blog post](https://blogs.sap.com/2023/01/27/sap-private-linky-swear-with-azure-global-scale-with-azure-cosmos-db-with-sap-private-link/) and prototype use [Azure Cosmos DB for NoSQL](https://learn.microsoft.com/azure/cosmos-db/introduction) in a multi-region setup with provisioned throughput.

## Contributions and community work 👩🏼‍🤝‍👨🏽

Follow [this thread](https://github.com/sapmentors/cds-pg/issues/355) to stay up to date with CDS for Azure CosmosDB and SAP CAP driven by the amazing SAP Mentors. Feel free to comment under the associated blog posts or create [issues](https://github.com/MartinPankraz/sap-nodejs-on-cosmosdb-app/issues) here on GitHub.
