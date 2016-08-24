//includes
var util = require('util'),
    twitter = require('twitter'),
    alchemy = require('./alchemy'),
    db = require('diskdb');

db = db.connect('db', ['sentiments']);
//config
var config = {
  consumer_key: '1hljg0hqryLn3rFY6FETzNmFo',
  consumer_secret: 'HUcUuMdVchB5goH4x3dcpkJ8RWijhAoMJ0hPhJ81wRunHQHcvO',
  access_token_key: '1190530488-40LPNdUEXLaq2iYs88JiErJKeGhFpXWHHgQ0jYH',
  access_token_secret: 'XFn9YAr8DnqHLhmwsnQJSobFyD5bKtn46IhIjlq2oX7a0'
};

module.exports = function(text, callback) {
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
  });
}