/**
 * Created by Samuel on 17/7/2017.
 */
var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/*
*
*
* Job Collection {
 name: string,
 description: string,
 category:string,
 location: [lat, long],
 duration: number,// duration per hour
 hourFee: number,// hourly fees rate
 preferDate: date,//preferred date
 preferTime: time, // preferred time.
 owner: userId,
 candidate: anotherUserId,
 available: boolean, // true --- is aviable for all users, false --- when the owner already picked one candidate. or job expired
 waitingList:[
 {userId},
 {userId}
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

 RestAPI ------ jobs/   ------ GET (location parameter)  ----- return all nearby jobs.

 RestAPI ------ jobs/post  ------ Post (form paramters)---- create a job.
 RestAPI ------ jobs/apply ----- POST (jobId, candidateId) ---- Enroll to one job.

 RestAPI ------ jobs/:uerId/post ------ Get -------  Return all jobs I posted
 RestAPI ------ jobs/:uerId/apply ------ Get -------  Return all jobs I applied for.

 RestAPI ------ job/:jobId/candidate ----- Get (path parameter:jobId) ----  return all canidate with detail infor.
 RestAPI ------ job/:jobId/candidate/:candiateId ----  See candidate's profile info.
 RestAPI ------ job/choose ----- POST (jobId, candidateId)

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
 * Test: get 10 closest locations.
 */
router.get('/', function(req, res, next){
    let lat= req.query.lat;
    let long = req.query.long;
    req.jobs.find({$near:{$geometry:{location:[lat,long]},$maxDistance:1000}}).limit(10).toArray(function(err, docArray){
        if (err) next(err);
        res.json(docArray);
        res.status(200);
    });
});

/**
 *  Return all jobs I posted
 */
router.get('/:uerId/post', function(req, res, next) {
    let query = {owner: ObjectId(req.params['userId'])};
    req.jobs.find(query).sort("preferDate", 1).toArray(function(err, docArray){
        if (err) next(err);
        res.json(docArray);
        res.status(200);
    });
});

/**
 *  Return all jobs I applied successfully
 */
router.get('/:uerId/apply', function(req, res, next) {
    let query = {candidate: ObjectId(req.params['userId'])};
    req.jobs.find(query).sort("preferDate", 1).toArray(function(err, docArray){
        if (err) next(err);
        res.json(docArray);
        res.status(200);
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
