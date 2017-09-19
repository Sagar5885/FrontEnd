var express = require('express');
var router = express.Router();

//Get Index1 Page
router.get('/', function(req, res){
	res.render('index1');
});

module.exports = router;