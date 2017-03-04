/*
This is a util library for the forecast weather project
This library provided generic functions that are used often in the project
 */
var config = require('./config/config');

/*
This function generates the URL to be used to send requests to
the dark sky api
@param coordinates:  geo co-ordinates in the form of {lat,lng}
@param forecastDate:  in the form of javascript date objects
 */

module.exports.getFormattedURL = function(coordinates, forecastDate) {
  var url = config.darkSkyForecastURL;
  url = url + '/' + config.darkSkySecretKey;
  url = url + '/' + coordinates.lat + ',' + coordinates.lng
  if (forecastDate) {
    url = url + ',' + forecastDate;
  }
  return url;
}

/*
This function generates the unix timestamp for a given javascript
date object

@param date :  javascript date object
@returns unix timestamp
 */
module.exports.getForecastDateInUnixTime = function(date) {
  return (Math.round(date.getTime() / 1000));
}


/*
get the index of the weekday from the array of weekdays
 */
module.exports.getWeekdayIndex = function(weekday) {
  if (!weekday || typeof weekday !== 'string') {
    return -1;
  }
  var weekdaysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return (weekdaysArray.indexOf(weekday.toLowerCase()));
}

/*
This function calculates the number of days to be added when the 
forecast request is in the future. 
has to be retrieved
@param requestedDayIndex - the weekday number for which the weather forecast
														is needed as a number of the week starting from 0
@param today - the weekday number for today starting from 0
@returns the number of days to be added to the current date
eg: if today is wednesday(3) and requestedDayIndex is monday(1)
then, 5 days is returned as the result to be added to today
to get the forecast as next monday
 */
module.exports.calculateDaystoBeAdded = function(requestedDayIndex, todayIndex) {
  var daysTobeAdded;
  /*if today's index is greater than the requested day index
  eg : if today is wednesday (3) and requestedDayIndex
  is monday(1) then the forecast day has to be in the NEXT
  week
  */
  if (todayIndex >= requestedDayIndex) {
    //since forecast day has to be next week,
    //subtract 7 from today and add the requestedDayIndex
    //to get the forecast day in the NEXT week
    daysTobeAdded = (7 - todayIndex) + requestedDayIndex;
  }
  /*if today's index is less than the requested day index
  eg : if today is wednesday (3) and requestedDayIndex
  is Friday(5) then the forecast day has to be in THIS
  week
  */
  if (todayIndex < requestedDayIndex) {
    //since forecast day is in the THIS week,
    //subtract the requested day index from today's index
    //to get the forecast day in THIS week
    daysTobeAdded = requestedDayIndex - todayIndex;
  }
  return daysTobeAdded;
}

/*
This function validates the location input
 */
module.exports.validateLocation = function(location) {
  if (!location || typeof location !== 'string') {
    return false;
  }
  return true;
}