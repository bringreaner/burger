// Import (require) connection.js into orm.js

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

// selectAll()
// insertOne()
// updateOne()

// Export the ORM object in module.exports.

var connection = require("../config/connection.js");

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (buffalo burger => 'buffalo burger')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // i.e. {name: 'buffalo burger'} => ["name='buffalo burger'"]
            // i.e. {devoured: true} => ["devoured=true"]
            arr.push(key + "=" + value);
        }
    }
}

var orm = {
    selectAll: function (cb) {
        var queryString = "SELECT * FROM burgers";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    insertOne: function (burgerName, cb) {
        var queryString = "INSERT INTO burgers (burger_name) VALUES ("+ burgerName + ")";
        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    updateOne: function (objColVals, condition, cb) {
        var queryString = "UPDATE burgers SET ";

        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result){
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
}

module.exports = orm;