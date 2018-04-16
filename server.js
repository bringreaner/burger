// Require the following npm packages inside of the server.js file:

// express
var express = require('express');
// body-parser
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080;

var app = express();
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// set handlebars
var exhbs = require('express-handlebars');

app.engine("handlebars", exhbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// start the server so it's listening to client requests.
app.listen(PORT, function(){
    // log (server-side) when our server has started.
    console.log("Server listening on: http://localhost:" + PORT);
    console.log("Routes: " + routes)
})