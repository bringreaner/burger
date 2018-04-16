// Import (require) connection.js into orm.js

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

// selectAll()
// insertOne()
// updateOne()

// Export the ORM object in module.exports.

var connection = require("../config/connection.js");

// function objToSql(ob) {
//     var arr = [];

//     // loop through the keys and push the key/value as a string int arr
//     for (var key in ob) {
//         var value = ob[key];
//         // check to skip hidden properties
//         if (Object.hasOwnProperty.call(ob, key)) {
//             // if string with spaces, add quotations (buffalo burger => 'buffalo burger')
//             if (typeof value === "string" && value.indexOf(" ") >= 0) {
//                 value = "'" + value + "'";
//             }
//             // i.e. {name: 'buffalo burger'} => ["name='buffalo burger'"]
//             // i.e. {devoured: true} => ["devoured=true"]
//             arr.push(key + "=" + value);
//         }
//     }
// }

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            //console.log("queryString: " + JSON.stringify(queryString));
            if (err) {
                throw err;
            }
            cb(result);
            //console.log("result: " + JSON.stringify(result))
        })
    },
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += "?";
        queryString += ") ";
        
        connection.query(queryString, vals, function(err, result){
            if (err) {
                throw err;
            }
            console.log(queryString);
            cb(result);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        
        if (objColVals == true) {
            objColVals = 1
        }
        else {
            objColVals = 0
        };
        var queryString = "UPDATE " + table;

        queryString += " SET devoured = ";
        queryString += objColVals;
        queryString += " WHERE id = ";
        queryString += condition;

        console.log("queryString: " + queryString);
        connection.query(queryString, function (err, result){
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;