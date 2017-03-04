var assert = require('chai').assert;
var coordinatesLookup = require('../coordinatesLookup');
var util = require('util');
describe('Test the getCoordinates function:', function() {
  it('should throw an error if location is not given', function(done) {
    coordinatesLookup.getCoordinates(null, function(err, coordinates) {
      if (err) {
        assert.equal(err.message, 'Invalid Location');
        return done();
      }
    });
  });

  it('should throw an invalid location error for invalid location', function(done) {
    coordinatesLookup.getCoordinates(123123, function(err, coordinates) {
      if (err) {
        assert.equal(err.message, 'Invalid Location');
        return done();
      }
    });
  });

  it('should provide a valid lat long json object for a valid city name', function(done) {
    this.timeout(10000);
    coordinatesLookup.getCoordinates('Cairns', function(err, coordinates) {
      if (err) {
        return done(err);
      }
      //console.log('coordinates???   '+util.inspect(coordinates));
      assert.equal(coordinates.lat, -16.9185514);
      assert.equal(coordinates.lng, 145.7780548);
      done();
    });
  });
});