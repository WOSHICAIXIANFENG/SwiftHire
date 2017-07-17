/**
 * Created by Samuel on 17/7/2017.
 */
var express = require('express');
var router = express.Router();

/*
* RestAPI ------ job/   ------ GET ---- location parameter ??
  RestAPI ------ job/post   ------ Post ---- create  // post a job
  RestAPI ------ job/apply ----- POST
  RestAPI ------ job/choose ----- POST jobId, userId,

 Other Rest APIs
 job/:id  ---- delete
 job/:id  ---- put



 Job Collection {
 name: string,
 description: string,
 category:string,
 location: [long, lat],
 duration: number,// duration per hour
 hourFee: number,// hourly fees rate
 preferDate: date,//preferred date
 preferTime: time, // preferred time.
 owner: userId,
 candiate: anotherUserId,
 waitingList:[
 {userId},
 {userId}
 ]
 }


*
* */

/**
 * Get all jobs ---- get query parameter location
 */
router.get('/', function(req, res, next){
    //var query =
});

/**
 * Test: get all jobs.
 */
router.get('/all', function(req, res, next){
    req.jobs.find().toArray(function(err, docArray){
        if (err) next(err);
        res.json(docArray);
    });
});

/**
 * Add one job
 */
router.post('/', function(req, res, next){
    var obj = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        duration: req.body.duration,
        hourFee: req.body.hourFee,
        preferDate: req.body.preferDate,
        preferTime: req.body.preferTime,
        owner: req.body.owner,
        candiate: null,
        waitingList: []
    };

    req.jobs.insert(obj, function (err, dataInsert) {
        if (err) next(err);
        res.json({"status": "success"});
    })
});



module.exports = router;
