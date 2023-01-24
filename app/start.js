const CosmosClient = require('@azure/cosmos').CosmosClient
const fastify = require('fastify')({
  logger: true
})

const path = require('path')
const dotenv = require('dotenv')

// Setup  Cosmos DB relevant data
dotenv.config({ path: path.resolve(__dirname, '.env') })

// Setup  Cosmos DB relevant data
const DATABASEID = process.env.DATABASEID
const CONTAINERID = process.env.CONTAINERID

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public')
})

const client = new CosmosClient({ endpoint: process.env.ENDPOINT, key: process.env.COMSOSKEY })

fastify.get('/', (request, reply) => {
  reply.sendFile('index.html')
})

// Get all addresses from SampleDB. See more examples here: https://learn.microsoft.com/azure/cosmos-db/nosql/quickstart-nodejs?tabs=azure-portal%2Cwindows
fastify.get('/addresses', async (request, reply) => {
  fastify.log.info(`Querying container:\n${CONTAINERID}`)

  const { resources: results } = await client.database(DATABASEID).container(CONTAINERID).items
    .query({
      query: 'SELECT * FROM c'
    })
    .fetchAll()

  for (const queryResult of results) {
    let resultString = JSON.stringify(queryResult)
    fastify.log.info(`\tQuery returned ${resultString}\n`)
  }
  reply.send(results)
})

const portNumber = process.env.PORT || 4000

const start = async () => {
  try {
    await fastify.listen({ port: portNumber, host: '0.0.0.0'})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
