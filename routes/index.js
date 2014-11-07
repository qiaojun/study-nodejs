var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'qj\'s Node investigation' });
});

module.exports = router;
