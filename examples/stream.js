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

var util = require('util'),

  ShodanClient = require('../'),

  options = {
    key: 'YOURKEYHERE',
    timeout: 15000
  },
  shodanClient = new ShodanClient(options);


console.log('\n------------------- streamBanners -------------------');
shodanClient.streamBanners(function (err, data) {
  if (err) {
    console.log('Error: shodanClient.streamBanners: ', err);
  } else {
    console.log(util.inspect(data, { depth: 6 }));
  }
});

console.log('\n------------------- streamPorts -------------------');
shodanClient.streamPorts('1434,27017,6379', function (err, data) {
  if (err) {
    console.log('Error: shodanClient.streamPorts: ', err);
  } else {
    console.log(util.inspect(data, { depth: 6 }));
  }
});
