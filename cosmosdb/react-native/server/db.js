const CosmosClient = require("@azure/cosmos").CosmosClient;
const endpoint = "https://sam-excel.documents.azure.com/";
const masterKey =
  "tPSbK05zlowZ5UDnqI1MAA4dBzl8E2uOEWi23X7lNXl2CgD1nfygdVAGVjRn7BlUTouLFehzHjRJBxSSvsVMVQ==";
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
