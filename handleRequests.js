"use strict";
/*
This library handles all the weather forecast requests coming into
the app
 */
var darkSkyForecast = require('./darkSkyForecast');
var coordinatesLookup = require('./coordinatesLookup');
var util = require('util');
var _ = require('lodash');
var forecastUtil = require('./forecastUtil');
//Empty Constructor
function HandleRequests() {

}

/*
This function returns the weather forecast for
a given location for a given weekday
 */
HandleRequests.prototype.getForecastForWeekday = function() {
  var self = this;
  return function(req, res) {
    var location = req.params.location;
    var weekday = req.params.weekday;
    var requestedDayIndex = forecastUtil.getWeekdayIndex(weekday);
    if (!(forecastUtil.validateLocation(location))) {
      return res.status(400).json({
        'message': 'You have provided an invalid location'
      });
    }
    if (requestedDayIndex == -1) {
      return self.sendResponse(res, 400, {
        'message': 'You have provided an invalid week day'
      });
    }
    //capture the timestamp for todat
    var today = new Date();
    //get the index for today's day
    var todayIndex = today.getUTCDay();
    //get the number of days to be added for the forecast date
    var daysToBeAdded = forecastUtil.calculateDaystoBeAdded(requestedDayIndex, todayIndex);
    // produce the timestamp for the future date
    var forecastDate = new Date(today.setTime(today.getTime() + daysToBeAdded * 86400000));
    console.log('forecastDate :: ' + forecastDate);
    //forecast to be sent to the client
    var sendForecast;
    //get the coordinates from google
    coordinatesLookup.getCoordinates(location, function(err, coordinates) {
      if (err) {
        return self.sendResponse(res, 400, {
          'message': err.message
        });
      }
      //get the weather forecast from dark sky
      darkSkyForecast.getFutureForecastFromDarkSky(forecastDate, coordinates, function(err, forecast) {
        if (err) {
          return self.sendResponse(res, 500, {
            'message': err.message
          });
        }
        //parse the forecast JSON from the dark sky
        try {
          sendForecast = JSON.parse(forecast);
        } catch (err) {
          return self.sendResponse(res, 500, {
            'message': err.message
          });
        }
        //send the forecast to the client
        self.sendResponse(res, 200, sendForecast);
      });
    });
  }
}

/*
This function returns the weather forecast for today
for a given location
 */
HandleRequests.prototype.getForecastForToday = function() {
  var self = this;
  return function(req, res) {
    //get the location from the query param
    var location = req.params.location;
    //the final JSON forecast data to be sent to the client
    var sendForecast;
    //validate the location
    if (!(forecastUtil.validateLocation(location))) {
      return res.status(400).json({
        'message': 'You have provided an invalid location'
      });
    }
    //get geo co-ordinates from Google Lookup
    coordinatesLookup.getCoordinates(location, function(err, coordinates) {
      if (err) {
        return self.sendResponse(res, 400, {
          'message': err.message
        });
      }
      //get the forecast for today from dark sky api
      darkSkyForecast.getTodaysForecast(coordinates, function(err, forecast) {
        if (err) {
          return self.sendResponse(res, 500, {
            'message': err.message
          });
        }
        //parse the forecast JSON from the dark sky
        try {
          sendForecast = JSON.parse(forecast);
        } catch (err) {
          return self.sendResponse(res, 500, {
            'message': err.message
          });
        }
        //send the forecast to the client
        self.sendResponse(res, 200, sendForecast);
      });
    });
  }
}

/*
Generic function to send response to the clients
params 
@res response object,
@status response status to be sent to the client
@body response body to be sent to the client

 */
HandleRequests.prototype.sendResponse = function(res, status, body) {
  res.status(status).json(body);
}



module.exports = HandleRequests;