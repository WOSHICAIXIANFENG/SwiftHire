/**
 * Created by Samuel on 17/7/2017.
 */
var express = require('express');
var router = express.Router();

/*
*
*
* Job Collection {
 name: string,
 description: string,
 category:string,
 location: [lat,long],
 duration: number,// duration per hour
 hourFee: number,// hourly fees rate
 preferDate: date,//preferred date
 preferTime: time, // preferred time.
 owner: userId,
 candiate: anotherUserId,
 available: boolean, // true --- is aviable for all users, false --- when the owner already picked one candidate. or job expired
 waitingList:[
 {userId},
 
 ]
 }

 ==================== Rest API
 Jobs Index  {
 category:string,
 location: [long, lat],
 duration: number,// duration per hour
 hourFee: number,// hourly fees rate
 preferDate: date,//preferred date
 preferTime: time, // preferred time.
 }

 RestAPI ------ job/   ------ GET (location parameter)  ----- return all nearby jobs.

 RestAPI ------ job/post  ------ Post (form paramters)---- create a job.
 RestAPI ------ job/apply ----- POST (jobId, candidateId) ---- Enroll to one job.

 RestAPI ------ user/:uerId/job/post ------ Get -------  Return all jobs I posted
 RestAPI ------ user/:uerId/job/apply ------ Get -------  Return all jobs I applyed for.

 RestAPI ------ job/:jobId/candidate ----- Get (path parameter:jobId) ----  return all canidate with detail infor.
 RestAPI ------ job/:jobId/candidate/:candiateId ----  See candidate's profile info.
 RestAPI ------ job/choose ----- POST (jobId, candidateId)

*
* *


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
 * Test: get 10 closest locations.
 */
router.get('/', function(req, res, next){
    let lat= req.query.lat;
    console.log('The latitude: '+lat);
    let long = req.query.long;
    let coords=[lat,long];
    console.log('The longitude: '+long);
    req.jobs.find({location:{ '$near': coords}}).limit(10).toArray(function(err, docArray){
        console.log('here we are'+ docArray);
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
