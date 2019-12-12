const express = require('express');
const router = express.Router();
const Search = require("../models/searches");
router.get('/searches', function(req, res, next){
    Search.find({}).then(function(searches){
        res.send(searches);
    });
});

//Add a new Search to DB
router.post('/searches', function(req, res, next){
    Search.create(req.body).then(function(search){
        res.send(search);
    }).catch(next);
});

//Delete Search from DB
router.get('/searches/:hash', function(req, res, next){
    Search.findOne({hash: req.params.hash}).then(function(search){
        if(search){
            res.send(search);
        }
        else{
            res.send(JSON.stringify({error: "No Data in MongoDB."}))
        }
    }).catch(next);
});
module.exports = router;