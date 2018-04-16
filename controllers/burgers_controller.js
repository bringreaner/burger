// Inside the burgers_controller.js file, import the following:

// Express
// burger.js

// Create the router for the app, and export the router at the end of your file.

var express = require('express');
// body-parser

var burger = require('../models/burger.js');

var router = express.Router();

router.get("/", function (req, res){
    burger.selectAll(function(data){
        var hbsObject = {
            burger: data
        };
        console.log("handlebars object: " + hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res){
    console.log("in put handler")

    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result) {
        // send back the id of the new quote
        res.json({ id: result.insertId});
    });
});

router.put("/api/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0 ) {
            // if no rows were changed, then the id must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;