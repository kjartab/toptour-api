require('./env.js');

// import { default as express } from 'express';
// import 'elasticsearch';
// import 'cors';
// import 'body-parser'

// import { default as express } from 'express';
var express = require('express');
var elasticsearch = require('elasticsearch');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

var client = new elasticsearch.Client( {  
    hosts: [
        process.env.ES_SERVER
    ]
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send({ 'message': 'Welcome to Toptour API' });
});

function search(index, type, query) {

    return new Promise((resolve, reject) => {

        var data = {
            index: index,
            body: {}
        }
        
        if (query) {
            data.body = query;
        }
        
        client.search(data).then(function (resp) {
            resolve(resp);        
        }, function (err) {
            reject(err);
        });
    });
}


/**
 * Handles index/type/_search type queries for elasticsearch
 */
app.post('/:index/:type/_search', function (req, res) {

    var type = req.params.type;
    var index = req.params.index;
    var query = req.body;

    search(index, type, query)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function() {
      res.sendStatus(500);
    });

});

/**
 * Handles index/_search type queries for elasticsearch
 */
app.post('/:index/_search', function(req, res) {

    var type = req.params.type;
    var index = req.params.index;

    search(index, type, req.body)
    .then(function(resp) {
        res.send(resp);
    })
    .catch(function() {
        res.sendStatus(500);
    });

});

/**
 * Handles index/_search type queries for elasticsearch
 */
app.get('/:index/:type/:id', function(req, res) {

    var type = req.params.type;
    var index = req.params.index;
    var query = req.body;

    search(index, type, query)
    .then(function(resp) {
        res.send(resp);
    })
    .catch(function() {
        res.sendStatus(500);
    });
    
});


app.listen(process.env.NODE_PORT);
