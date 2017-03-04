# newsCorp
This repo holds the news corp coding challenge

This repo was scaffolded using the express generator

## Check Build Status after Each commit

[![Build Status](https://travis-ci.org/rohitarjunagi/newsCorpCodingChallenge.svg?branch=master)](https://travis-ci.org/rohitarjunagi/newsCorpCodingChallenge)

## Running Locally

```sh
$ git clone https://github.com/rohitarjunagi/newsCorp.git # or fork your own copy
$ cd newsCorp
$ npm install
$ npm start
```
## Running Test cases Locally

```sh
$ npm test
```

## Documentation

News Corp Coding Challenge:
Welcome to the News Corp weather forecast app. To use this app, just hit the url:

http://localhost:3000/weather/{location}/{weekday}

Where:
location: is the location where you want the weather
forecast to be displayed.

weekday: is the day of the week for which the weather should be
displayed. The valid weekdays are monday through sunday (case
insensitive)

If an invalid weekday or location is provided, then you will get
an error

If you want the weather forecast for today for a particular location, then hit the url :

http://localhost:3000/weather/{location}/today
