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

// Streaming API
// https://developer.shodan.io/api/stream

var utils  = require('./utils'),

  URL_STRING = 'stream';


// Public methods

module.exports.banners = function (key, timeout, callback) {
  var partialQuery = '/shodan/banners?',
    options = {
      partialQuery: partialQuery,
      key: key,
      timeout: timeout
    };

  utils.apiRequest(URL_STRING, options, callback);
};


module.exports.ports = function (config, callback) {
  var partialQuery = '/shodan/ports/',
      options = {
        key: config.key,
        timeout: config.timeout
      };

  if (config.ports) {
    partialQuery += config.ports + '?';
    options.partialQuery = partialQuery;
    utils.apiRequest(URL_STRING, options, callback);
  } else {
    callback({
      msg: 'The "ports" parameter is mandatory'
    });
  }
};
