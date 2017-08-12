var express = require('express')
var elasticsearch = require('elasticsearch')

var router = express.Router()

var url = "http://" + process.env.ELASTIC_USER + ":" + process.env.ELASTIC_PASSWORD + "@" + process.env.ES_SERVER + ":9200";

var client = new elasticsearch.Client( {  
    hosts: [
        url
    ]   
});


function search(index, type, query) {
    console.log(url);
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


// router.get('/', (req, res) => {
//     res.send("search")
// })

/**
 * Handles index/type/_search type queries for elasticsearch
 */
router.post('/:index/:type/_search', function (req, res) {

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
router.get('/:index/_search', function(req, res) {

    var type = req.params.type;
    var index = req.params.index;

    search(index, type, {})
    .then(function(resp) {
        res.send(resp);
    })
    .catch(function() {
        res.sendStatus(500);
    })

})


/**
 * Handles index/_search type queries for elasticsearch
 */
router.post('/:index/_search', function(req, res) {

    var type = req.params.type;
    var index = req.params.index;

    search(index, type, req.body)
    .then(function(resp) {
        res.send(resp);
    })
    .catch(function() {
        res.sendStatus(500);
    })

})

/**
 * Handles index/_search type queries for elasticsearch
 */
router.get('/:index/:type/:id', function(req, res) {

    var type = req.params.type;
    var index = req.params.index;
    var query = req.body;

    search(index, type, query)
    .then(function(resp) {
        res.send(resp);
    })
    .catch(function() {
        res.sendStatus(500);
    })
    
})


router.get('*', (req, res) => {
    res.sendStatus(404);
})


module.exports = router