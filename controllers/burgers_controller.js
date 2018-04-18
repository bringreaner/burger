//import { resolveNaptr } from "dns";

// Inside the burgers_controller.js file, import the following:

// Express
// burger.js

// Create the router for the app, and export the router at the end of your file.
var connection = require("../config/connection.js");
var express = require('express');
// body-parser

var db = require('../models');

var router = express.Router();



router.get("/", function (req, res) {
    db.Burger.findAll({}).then(function (data) {
        var hbsObject = {
            burger: data
        };
        console.log("handlebars object: " + hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    console.log("in put handler")

    db.Burger.create({
        burger_name: req.body.burger_name
    }).then(function (result) {
        // send back the id of the new quote
        res.json({
            id: result.insertId
        });
    })
})

router.put("/api/burger/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    if (req.body.devoured == 1) {
        req.body.devoured = 0
    } else {
        req.body.devoured = 1
    };

    db.Burger.update({
        devoured: 1},
        {
            where: {
                id: req.params.id
            }
        },
        ).then(
        function (result) {
            console.log(JSON.stringify("controller file: " + result))
            if (result.changedRows == 0) {
                // if no rows were changed, then the id must not exist, so 404
                return res.status(404).end();
            } else {
                res.json(result)
            }
        });
});

module.exports = router;