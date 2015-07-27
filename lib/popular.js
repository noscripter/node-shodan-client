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

// Popular RSS
// Key not needed here, http://www.shodanhq.com/browse

var utils  = require('./utils'),

  POPULAR_URL = 'http://www.shodanhq.com/browse/popular/feed',
  POPULAR_URL_BASE = 'http://www.shodanhq.com/browse/';


// Public methods

module.exports.search = function (timeout, callback) {
  utils.rssRequest(POPULAR_URL, timeout, callback);
};


module.exports.searchByTag = function (tag, timeout, callback) {
  if (tag) {
    utils.rssRequest(
      POPULAR_URL_BASE  + 'tag/' + tag + '?feed=1',
        timeout,
        callback
      );
  } else {
    callback({
      msg: 'The "tag" parameter is mandatory'
    });
  }
};
