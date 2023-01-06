const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '.env')})
const CosmosClient = require('@azure/cosmos').CosmosClient
const express = require('express')
const app = express()
const router = express.Router()

const DATABASEID = process.env.DATABASEID
const CONTAINERID = process.env.CONTAINERID

const client = new CosmosClient({endpoint: process.env.ENDPOINT, key: process.env.COMSOSKEY})

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});
//Get all addresses from SampleDB. See more examples here: https://learn.microsoft.com/azure/cosmos-db/nosql/quickstart-nodejs?tabs=azure-portal%2Cwindows
router.get('/addresses', async (req, res) => {
    console.log(`Querying container:\n${CONTAINERID}`)
  
    const { resources: results } = await client.database(DATABASEID).container(CONTAINERID).items.
        query({
            query: 'SELECT * FROM c',
        })
        .fetchAll()

    for (var queryResult of results) {
        let resultString = JSON.stringify(queryResult)
        console.log(`\tQuery returned ${resultString}\n`)
    }
    res.send(results)
});

const port = process.env.PORT || 4000;
app.use("/", router);
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
