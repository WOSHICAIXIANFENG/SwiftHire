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
 location: [long, lat],
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

 RestAPI ------ jobs/:jobId/candidate ----- Get (path parameter:jobId) ----  return all candidate with detail info.
 RestAPI ------ jobs/:jobId/candidate/:candidateId ----  See candidate's profile info.
 RestAPI ------ jobs/choose ----- POST (jobId, candidateId)

*
* */

// /**
//  * Get all jobs ---- get query parameter location
//  */
// router.get('/', function(req, res, next){
//     //var query =
// });

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
    //!!! Note: Don't forget to parse coordinates to number
    let lat= parseFloat(req.query.lat);
    let long = parseFloat(req.query.long);
    console.log(long);
    console.log(lat);
    req.jobs.find({"location":{$near:{$geometry:{type:"Point", coordinates:[long, lat]}, $maxDistance:500}}}).limit(10)
        .toArray(function(err, docArray){
        if (err) next(err);
        res.json(docArray);
        res.status(200);
    });
});

/**
 *  Return all jobs I posted
 */
router.get('/:uerId/post', function(req, res, next) {
    let query = {"owner": ObjectId(req.params['userId'])};
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
    let query = {"candidate": ObjectId(req.params['userId'])};
    req.jobs.find(query).sort("preferDate", 1).toArray(function(err, docArray){
        if (err) next(err);
        res.json(docArray);
        res.status(200);
    });
});

/**
 * Get all candidates for this job
 */
router.get('/:jobId/candidate', function(req, res, next) {
    let query = {"_id": ObjectId(req.params['jobId'])};
    req.jobs.findOne(query, function(err, doc){
        if (err) next(err);
        console.log(doc.waitingList);
        res.json(doc.waitingList);
    });
});

/**
 * Get one candidate's detail information
 */
router.get('/:jobId/candidate/:candidateId', function(req, res, next) {
    let query = {"_id": ObjectId(req.params['candidateId'])};
    req.users.findOne(query, function(err, doc){
        if (err) next(err);
        console.log(doc);
        res.json(doc);
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

/**
 * Load some testing data
 */
router.get('/init', function(req, res, next) {
    //req.jobs.createIndex({'location:':'2dsphere'}); // run in mongo shell

    let obj1 = {"_id":"1","name":"Wash car","description":"Wash my neigbours Ferrari","category":"Wash","location":{"type":"Point", "coordinates":[-91.96811168,41.00800002]},"duration":"2","hourFee":"8","preferDate":"7/18/2017","preferTime":"3:00 pm","candidate":"","available":"true","waitingList":[],"owner":"1"};
    let obj2 = {"_id":"2","name":"Clean the restroom","description":"Wash my neigbours Ferrari","category":"Wash","location":{"type":"Point", "coordinates":[-91.96811168,41.00800019]},"duration":"2","hourFee":"8","preferDate":"7/18/2017","preferTime":"3:00 pm","candidate":"","available":"true","waitingList":[],"owner":"2"};
    let obj3 = {"_id":"3","name":"Wash car","description":"Wash my neigbours Ferrari","category":"Wash","location":{"type":"Point", "coordinates":[-91.96811167,41.00800002]},"duration":"2","hourFee":"8","preferDate":"7/18/2017","preferTime":"3:00 pm","candidate":"","available":"true","waitingList":[],"owner":"3"};
    let obj4 = {"_id":"4","name":"Wash Window","description":"Wash my neigbours Ferrari","category":"Wash","location":{"type":"Point", "coordinates":[-91.96811168,41.00800001]},"duration":"2","hourFee":"8","preferDate":"7/18/2017","preferTime":"3:00 pm","candidate":"","available":"true","waitingList":[],"owner":"3"};

    req.jobs.insertMany([obj1, obj2, obj3, obj4], function(err, insertData){
        if (err) next(err);
        return res.send("Insert Success");
    });
});


module.exports = router;
