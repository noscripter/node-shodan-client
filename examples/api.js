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
    key: 'zOYYpP1Z13ysDc0RJ7L3T812xthSd9Tt',
    timeout: 15000
  },
  shodanClient = new ShodanClient(options),
  searchOptions,
  // countOptions,
  hostOptions;


// Minimal required parameters
hostOptions = { ip: '1.1.1.1' };

// Full supported params
// hostOptions = {
//   ip: '1.1.1.1',
//   history: true, // default is false
// };

console.log('\n------------------- host -------------------');
shodanClient.shodanHost(hostOptions, function (err, data) {
  if (err) {
    console.log('Error: shodanClient.host: ' + err);
  } else {
    console.log(util.inspect(data, { depth: 6 }));
  }
});

// Minimal required parameters
searchOptions = {
  query: 'asterisk'
};

// Full supported params
// TODO: API still fails with some of them
searchOptions = {
  query: 'asterisk',
  // query: 'asterisk port:5060',
  // query: encodeURIComponent('openssh port:22'),
  // query: 'openssh+port%3A22',
  // query: 'penssh%20port%3A22',
  limit: 5,
  // facets: 'port:100',
  minify: false
};

// A premium account is needed in some cases, in the doc:
// " Uses 1 query credit if:
// - Page number > 1
// - Search query contains any of the following filters: city,
// country, net, geo, before, after, org, isp, title, html "
console.log('\n------------------- search -------------------');
shodanClient.shodanHostSearch(searchOptions, function (err, data) {
  if (err) {
    console.log('Error: shodanClient.search: ' + err);
  } else {
    console.log(util.inspect(data, { depth: 6 }));
  }
});

// Minimal required parameters
// countOptions = {
//   query: 'freepbx'
// };

// Full supported params
// countOptions = {
//   query: 'freepbx',
//   facets: 'port:100'
// };

// console.log('\n------------------- count -------------------');
// shodanClient.shodanHostcount(countOptions,  function (err, data) {
//   if (err) {
//     console.log('Error: shodanClient.count: ' + err);
//   } else {
//     console.log(util.inspect(data, { depth: 6 }));
//   }
// });

console.log('\n------------------- resolve -------------------');
shodanClient.dnsResolve('google.com,bing.com', function (err, data) {
  if (err) {
    console.log('Error: shodanClient.resolve: ' + err);
  } else {
    console.log(util.inspect(data, { depth: 6 }));
  }
});

console.log('\n------------------- reverse -------------------');
shodanClient.dnsReverse('74.125.227.230,204.79.197.200', function (err, data) {
  if (err) {
    console.log('Error: shodanClient.reverse: ' + err);
  } else {
    console.log(util.inspect(data, { depth: 6 }));
  }
});

console.log('\n------------------- myip -------------------');
shodanClient.toolsMyip(function (err, data) {
  if (err) {
    console.log('Error: shodanClient.toolsMyip: ' + err);
  } else {
    console.log(util.inspect(data, { depth: 6 }));
  }
});
