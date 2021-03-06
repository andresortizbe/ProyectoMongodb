const dotenv = require("dotenv");
dotenv.config();

let config = {};
config.db = {};

const username = process.env.USERNAME_DB;
const password = process.env.PASSWORD_DB; 
const database = process.env.DATABASE;
const PORT = process.env.PORT;
config.db.host = `mongodb+srv://${username}:${password}@cluster0.jcdvt.mongodb.net/${database}?retryWrites=true&w=majority`;


module.exports = config;