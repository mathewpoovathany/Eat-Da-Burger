// Set up MySQL connection.
const mysql = require("mysql");

let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
/*
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kate2016",
    database: "burgers_db"
  });
}
*/

  connection = mysql.createConnection({
    host: "	a5s42n4idx9husyc.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "do8bsashedj7y1op",
    password: "opzq4qm64fn6z2fj",
    database: "g0gmnrt8qqfxerf8"
  });
}


connection.connect();

module.exports = connection;
