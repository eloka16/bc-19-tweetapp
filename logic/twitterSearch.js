//includes
var util = require('util'),
    twitter = require('twitter'),
    alchemy = require('./alchemy'),
    db = require('diskdb');

db = db.connect('db', ['sentiments']);
//config


module.exports = function Tweet(text, callback) {
  var twitterClient = new twitter(config);
  var response = [], dbData = []; // to store the tweets and sentiment

  twitterClient.search(text, function(data) {
    for (var i = 0; i < data.statuses.length; i++) {
      var resp = {};

      resp.tweet = data.statuses[i];
      resp.watson = alchemy(data.statuses[i].text);
      dbData.push({
        tweet: resp.tweet.text,
        score: resp.watson.score
      });
      response.push(resp);
    };
    db.watson.save(dbData);
    callback(response);
	console.log(response)
  });
}

