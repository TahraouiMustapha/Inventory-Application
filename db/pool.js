const { Pool } = require("pg")


module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "mustapha",
  database: "inventory_application",
  password: "mustapha2003",
  port: 5432 // The default port
})