const CosmosClient = require("@azure/cosmos").CosmosClient;
const endpoint = "https://<your_cosmosdb_name>.documents.azure.com/";
const masterKey = "<your_cosmosdb_master_key>";
const conn = new CosmosClient({
  endpoint: endpoint,
  auth: { masterKey: masterKey }
});
conn.databases.createIfNotExists({ id: "to_do" }).then(
  db => {
    console.log(`Created database:${JSON.stringify(db.body)}`);
  },
  err => {
    console.log(err);
  }
);

conn
  .database("to_do")
  .containers.createIfNotExists({ id: "toDoList" })
  .then(
    collection => {
      console.log(`Created database:${JSON.stringify(collection.body)}`);
    },
    err => {
      console.log(err);
    }
  );

module.exports = { conn: conn };
