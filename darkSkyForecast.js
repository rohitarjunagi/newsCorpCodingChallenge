/*
This is the library used to get the weather forecast
from the dark sky api
 */
"use strict";

var request = require('request');
var config = require('./config/config');
var forecastUtil = require('./forecastUtil');

/*
This function is used to get the future forecast from dark sky
using the time machine request API
 */
module.exports.getFutureForecastFromDarkSky = function(date, coordinates, callback) {
  if (!(date instanceof Date)) {
    return callback(new Error('Invalid Date format'));
  }
  //get the UNIX timestamp for the forecast date
  var forecastDate = forecastUtil.getForecastDateInUnixTime(date);
  //get the formatted url with lat, long and unix timestamp
  var formattedUrl = forecastUtil.getFormattedURL(coordinates, forecastDate);
  var options = {
    "url": formattedUrl,
  };
  request.get(options, function(err, res, body) {
    if (err) {
      return callback(err);
    }
    if ((res.statusCode !== 200) && (res.statusCode !== 202)) {
      return callback(new Error('Invalid Response from dark sky'));
    }
    if (!body) {
      return callback(new Error('Invalid response from dark sky'));
    }
    callback(null, body);
  });
}

/*
This function is used to get the current weather forecast from dark sky
using the forecast request API
 */
module.exports.getTodaysForecast = function(coordinates, callback) {
  //get the formatted url with just lat, long
  var formattedUrl = forecastUtil.getFormattedURL(coordinates);
  var options = {
    "url": formattedUrl,
  };
  //send get request to the dark sky api
  request.get(options, function(err, res, body) {
    if (err) {
      return callback(err);
    }
    if ((res.statusCode !== 200) && (res.statusCode !== 202)) {
      return callback(new Error('Invalid Response from dark sky'));
    }
    if (!body) {
      return callback(new Error('Invalid response from dark sky'));
    }
    callback(null, body);
  });
}