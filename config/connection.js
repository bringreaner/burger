// Inside the connection.js file, setup the code to connect Node to MySQL.
// Export the connection.

//set up to mysql
var mysql = require("mysql");

var connection = mysql.createConnection({
    port: 8889,
    host: "localhost",
    user: "root",
    password: "root",
    database: "burgers_db"
});

// actually connects
connection.connect(function(err){
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

//exports the connect for the ORM to use
module.exports = connection;