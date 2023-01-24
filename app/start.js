const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '.env')})
const CosmosClient = require('@azure/cosmos').CosmosClient
const express = require('express')
const app = express()
const router = express.Router()

// Setup  Cosmos DB relevant data
const DATABASEID = process.env.DATABASEID
const CONTAINERID = process.env.CONTAINERID

const client = new CosmosClient({ endpoint: process.env.ENDPOINT, key: process.env.COMSOSKEY })

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Get all addresses from SampleDB. See more examples here: https://learn.microsoft.com/azure/cosmos-db/nosql/quickstart-nodejs?tabs=azure-portal%2Cwindows
router.get('/addresses', async (request, reply) => {
  console.log(`Querying container:\n${CONTAINERID}`)

  const { resources: results } = await client.database(DATABASEID).container(CONTAINERID).items
    .query({
      query: 'SELECT * FROM c'
    })
    .fetchAll()

  for (const queryResult of results) {
    let resultString = JSON.stringify(queryResult)
    console.log(`\tQuery returned ${resultString}\n`)
  }
  reply.send(results)
})

const portNumber = process.env.PORT || 4000
app.use("/", router);

const start = async () => {
  try {

    app.listen(portNumber);
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
start()
