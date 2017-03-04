var darkSkyForecast = require('../darkSkyForecast');
var assert = require('chai').assert;
var util = require('util');
var test_config = require('./test-config');

describe('Test the darkSkyForecast library:', function() {
  describe('test getFutureForecastFromDarkSky function:', function() {
    it('should throw an Invalid Response for invalid coordinates', function(done) {
      darkSkyForecast.getFutureForecastFromDarkSky(new Date(), {}, function(err) {
        if (err) {
          assert.equal(err.message, 'Invalid Response from dark sky');
          return done();
        }
      });
    });

    it('should throw an Invalid Response for invalid date', function(done) {
      darkSkyForecast.getFutureForecastFromDarkSky('asdasd', {
        'lat': -16.9185514,
        'lng': 145.7780548
      }, function(err) {
        if (err) {
          assert.equal(err.message, 'Invalid Date format');
          return done();
        }
      });
    });

    it('should give the forecast for correct inputs', function(done) {
      this.timeout(10000);
      darkSkyForecast.getFutureForecastFromDarkSky(new Date('2017-03-03T02:38:10.130Z'), {
        'lat': -16.9185514,
        'lng': 145.7780548
      }, function(err, forecast) {
        if (err) {
          return done(err);
        }
        assert(JSON.parse(test_config.expectedForecast), JSON.parse(forecast));
        done();
      });
    });
  });
});