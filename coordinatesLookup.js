/*
This library is used to do the google lookup
to find the geo co-ordinates for a given location
 */
"use strict";

var config = require('./config/config');
var util = require('util');
var _ = require('lodash');
var googleMapsClient = require('@google/maps').createClient({
  key: config.googleAPI_key
});

/*
This function gets the {lat: , lng : } JSON from the google
geocode lookup service
@param location : location for which geo code needs to be looked up
                  provided in the form of a string
 */

module.exports.getCoordinates = function(location, done) {
  //validate the input
  if (!location || typeof location !== 'string' ) {
    return done(new Error('Invalid Location'));
  }
  //use the googleMapsClient module to get the
  //geo-co-ordinates
  googleMapsClient.geocode({
    address: location
  }, function(err, response) {
    //check if the request errored out
    if (err) {
      return done(err);
    }
    //check if the response code is 400
    if (response.status === 400) {
      return done(new Error('Invalid Request'))
    }
    //sanitize the results
    var results = response.json.results || [];
    if (results.length == 0) {
      return done(new Error('Invalid Response from Google Coordinates lookup'));
    }
    //sanitize the results
    var geometry = results[0].geometry || {};
    if (_.isEmpty(geometry)) {
      return done(new Error('Invalid Response from Google Coordinates lookup'));
    }
    //sanitize the results
    var coordinates = geometry.location || '';
    if (!coordinates) {
      return done(new Error('Invalid Coordinates'));
    }
    //if coordinates is successfully extracted,
    //then send the coordinates back to the calling function
    done(null, coordinates);
  });
}