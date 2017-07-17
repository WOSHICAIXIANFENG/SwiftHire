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
    //res.send('respond with a resource');
    // Solution1: use promise
    fetch('http://jsonplaceholder.typicode.com/users/')
        .then(function(res){
            return res.json(); // [object Promise]
        }).then(function(json){
        //console.log(json);

        res.render("users", { users: json });
    }).catch(function(err) {
        console.log(err);
        res.render("error", { message: 'some error happens', error:{
            status: 505,
            stack: 'Some stack information'
        }});
    });
});

module.exports = router;

