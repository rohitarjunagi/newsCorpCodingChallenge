var forecastUtil = require('../forecastUtil');
var assert = require('chai').assert;
var util = require('util');

describe('Test the forecastUtil library : ', function() {
  describe('Test the getFormattedURL function:', function() {
    it('should give a valid url for a given location and unix time', function(done) {
      var formattedURL = forecastUtil.getFormattedURL({
        'lat': -16.9185514,
        'lng': 145.7780548
      }, 1488508435);
      assert.equal(formattedURL, 'https://api.darksky.net/forecast/a04b6b02b95e89b9f19ad5ef3399add4/-16.9185514,145.7780548,1488508435');
      done();
    });
  });

  describe('Test the getForecastDateInUnixTime function:', function() {
    it('should give a valid unix timestamp for a valid date', function(done) {
      var unixTime = forecastUtil.getForecastDateInUnixTime(new Date('2017-03-03T02:38:10.130Z'));
      assert.equal(unixTime, 1488508690);
      done();
    });
  });

  describe('test the calculateDaystoBeAdded function : ', function() {
    it('if today is friday and requested day is monday, days to be added should be 3 ', function(done) {
      var daysToBeAdded = forecastUtil.calculateDaystoBeAdded(1, 5);
        assert.equal(daysToBeAdded, 3);
        done();
    });
    it('if today is friday and requested day is friday, days to be added should be 7 that is next friday ', function(done) {
      var daysToBeAdded = forecastUtil.calculateDaystoBeAdded(5, 5);
        assert.equal(daysToBeAdded, 7);
        done();
    });
    it('if today is monday and requested day is thursday, days to be added should be 3 days', function(done) {
      var daysToBeAdded = forecastUtil.calculateDaystoBeAdded(4, 1);
        assert.equal(daysToBeAdded, 3);
        done();
    });
  });
  describe('Test the validateLocation function:', function() {
    it('If invalid location is given, the function should return false', function(done) {
      var flag = forecastUtil.validateLocation(null);
      assert.isFalse(flag);
      done();
    });
    it('If location is a number,the function should return false', function(done) {
      var flag = forecastUtil.validateLocation(1244234);
      assert.isFalse(flag);
      done();
    });
    it('If valid location is given, the function should return true', function(done) {
      var flag = forecastUtil.validateLocation('Brisbane');
      assert.isTrue(flag);
      done();
    });
  });
  describe('Test the getWeekdayIndex function:', function() {
    it('if valid weekday is given, it should return a valid index', function(done) {
      var requestedDayIndex = forecastUtil.getWeekdayIndex('wednesday');
      assert.equal(requestedDayIndex, 3);
      done();
    });
    it('if weekday contains capital letters, it should still be processed and a valid index should be returned', function(done) {
      var requestedDayIndex = forecastUtil.getWeekdayIndex('SuNDAy');
      assert.equal(requestedDayIndex, 0);
      done();
    });
    it('if invalid weekday is given,it should return -1', function(done) {
      var requestedDayIndex = forecastUtil.getWeekdayIndex('WhatADay');
      assert.equal(requestedDayIndex, -1);
      done();
    });
  });
});