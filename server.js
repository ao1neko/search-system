var fs = require('fs'); 
var express = require('express');
var bodyParser = require('body-parser');  
var elasticsearch = require('elasticsearch');

var urlencodedParser = bodyParser.urlencoded({ extended: false }) 
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

var app = express();
var hitory_list= [];



app.get('/api/sync', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({data:hitory_list}));
})



app.post('/api/post',urlencodedParser, function (req, res,next) {   

        client.search({
            index: 'article',
            body: {
              from: 0,
              size: 100,
              query: {
                multi_match: { 
                    query: req.body.search_key,
                    fields: ['title', 'abstacrt'],
                    type: 'phrase'
              }
              }
            }
          }).then(async function (resp) {
            res.setHeader('Content-Type', 'application/json');
            await res.end(JSON.stringify(resp.hits));
         });

 })  

 app.post('/api/history',urlencodedParser, function (req, res,next) {   
    hitory_list.unshift({name:req.body.search_key}); 
    if(hitory_list.length>=11) hitory_list.splice(10,1);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({data:hitory_list}));
})  




var server = app.listen(5000, function () {

    console.log("Example app listening at http://localhost:5000");
})
