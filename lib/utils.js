/*

Copyright Jesus Perez <jesusprubio gmail com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

'use strict';

var request = require('request'),
    parseString = require('xml2js').parseString,

    SIMULATION = false;


// Public methods

// It makes a request to the API
module.exports.apiRequest = function (api, options, callback) {
  var baseUrl = 'https://' + api + '.shodan.io',
    url;

  if (SIMULATION) {
    console.log ('Simulating an HTTP call: ' + JSON.stringify(options));
  } else {
    if (options.key) {
      url = baseUrl + options.partialQuery + 'key=' + options.key;
      console.log(url);
      request(
      {
        uri: url,
        method: options.method || 'GET',
        json: true,
        timeout: options.timeout
      },
      function (err, response, body) {
        if (!err && response.statusCode === 200) {
          if (/maintenance/.exec(body)) {
            callback({
              msg: 'SHODAN API is undergoing maintenance'
            });
          } else {
            callback(null, body);
          }
        } else {
          callback({
            msg: 'Making this request to the API: ' + url,
            error: err || body || null
          });
        }
      });
    } else {
      callback({
        msg: 'You must provide a valid API key'
      });
    }
  }
};


// It makes an RSS request to get the popular feeds
module.exports.rssRequest = function (url, timeout, callback) {
  console.log(url);
  request(
    {
      uri: url,
      method: 'GET',
      json: false,
      timeout: timeout
    },
    function (err, response, body) {
      if (!err && response.statusCode === 200) {
        parseString(body, function (err, result) {
          callback(null, result);
        });
      } else {
        callback({
          msg: 'Making this request to the RSS feed: ' + url,
          error: err || body || null
        });
      }
    }
  );
};
