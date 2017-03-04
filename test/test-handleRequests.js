var HandleRequests = require('../handleRequests');
var handleRequests = new HandleRequests();
var assert = require('chai').assert;
var util = require('util');
var request = require('supertest');
var expressInitialisation = require('./expressInitialisation');
var app = expressInitialisation.configureExpress();


describe('Test the handleRequests library:', function() {
  describe('test the getForecastForWeekday route:', function() {
    it('should give a weather forecast for valid location and day', function(done) {
      this.timeout(10000);
      request(app)
        .get("/weather/Darwin/wednesday")
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.notEqual(res.body, null);
          done();
        });
    });
    it('should give an error for an invalid day', function(done) {
      request(app)
        .get("/weather/Darwin/whatADay")
        .expect(400)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.equal(res.body.message, "You have provided an invalid week day");
          done();
        });
    });
    it('should give an error for an invalid location', function(done) {
      request(app)
        .get("/weather/{}/wednesday")
        .expect(400)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.equal(res.body.message, 'Invalid Response from Google Coordinates lookup');
          done();
        });
    });
  });
  describe('test the getForecastForToday route:', function() {
    it('should give a weather forecast for valid location and day', function(done) {
      this.timeout(10000);
      request(app)
        .get("/weather/Darwin/today")
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.notEqual(res.body, null);
          done();
        });
    });
    it('should give an error for an invalid location', function(done) {
      request(app)
        .get("/weather/{}/today")
        .expect(400)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.equal(res.body.message, 'Invalid Response from Google Coordinates lookup');
          done();
        });
    });
  });
});