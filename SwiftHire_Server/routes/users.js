var express = require('express');
var router = express.Router({caseSensitive: true, strict:true});
var fetch = require('node-fetch');

const Rx = require('@reactivex/rxjs');

/**
 * User Collection {
	_id:
	name: string,
	avatar: url,
	comments: [
		{content: string, date: date, rate:number, jobId: number},
		{},
	]
}

 ========= Rest API List
 RestAPI ------ user/:userId ----- Get  ----- Show user's profile.
 RestAPI ------ job/:jobId/candidate/:candiateId ----  See candidate's profile info.

 */


/* GET users listing. */
router.get('/', function(req, res, next) {
    req.users.find({}).toArray((err, docArray) => {
         if (err) next(err);
         console.log(docArray);
         res.json(docArray);
     });
})

/**
 * Get user detail info
 */
router.get('/:userId', function(req, res, next) {
    //res.send('respond with a resource');
    console.log("userId = " + req.params);
    req.users.find({_id: userId}, function(error, data) {
        console.log(data);
    });

    // // Solution1: use promise
    // fetch('http://jsonplaceholder.typicode.com/users/')
    //     .then(function(res){
    //         return res.json(); // [object Promise]
    //     }).then(function(json){
    //     //console.log(json);
    //     res.render("users", { users: json });
    // }).catch(function(err) {
    //     console.log(err);
    //     res.render("error", { message: 'some error happens', error:{
    //         status: 505,
    //         stack: 'Some stack information'
    //     }});
    // });
});

module.exports = router;

