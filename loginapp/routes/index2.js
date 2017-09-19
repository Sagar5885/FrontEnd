var express = require('express');
var router = express.Router();

//Get index2 Page
router.get('/', function(req, res){
	res.render('index2');
});

module.exports = router;