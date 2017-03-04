var express = require('express');
var router = express.Router();
var HandleRequests = require('../handleRequests');
var handleRequests = new HandleRequests();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET weather forecase for a particular location for today*/
router.get('/weather/:location/today', handleRequests.getForecastForToday());

/* GET weather forecase for a particular location for a particular day. */
router.get('/weather/:location/:weekday', handleRequests.getForecastForWeekday());

module.exports = router;
