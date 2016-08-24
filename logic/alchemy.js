var watson = require('watson-developer-cloud');

module.exports = function(text) {
  return watson(text);
};