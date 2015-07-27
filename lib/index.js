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

// https://developer.shodan.io/api

var lodash = require('lodash'),
  popularReqs = require('./popular'),
  streamReqs = require('./stream'),
  exploitReqs = require('./exploit'),
  utils  = require('./utils'),

  URL_STRING = 'api';


// Constructor

function ShodanClient(options) {
  this.key = options.key || null;
  this.timeout = options.timeout || 10000;
}


// Public methods

// Shodan

ShodanClient.prototype.shodanHost = function (config, callback) {
  var partialQuery = '/shodan/host/',
    options;

  if (config.ip) {
    partialQuery += config.ip + '?';
    if (config.history) {
      partialQuery += 'history=' + config.history + '&';
    }

    options = {
      partialQuery: partialQuery,
      key: this.key,
      timeout: this.timeout
    };
    utils.apiRequest(URL_STRING, options, callback);
  } else {
    callback({
      msg: 'The "ip" parameter is mandatory'
    });
  }
};


ShodanClient.prototype.shodanHostCount = function (config, callback) {
  var partialQuery = '/shodan/host/count?',
    options;

  if (config.query) {
    partialQuery += 'query=' + config.query + '&';
    if (config.facets) {
      partialQuery += 'facets=' + config.facets + '&';
    }
    options = {
      partialQuery: partialQuery,
      key: this.key,
      timeout: this.timeout
    };
    utils.apiRequest(URL_STRING, options, callback);
  } else {
    callback({
      msg: 'The "query" parameter is mandatory'
    });
  }
};


ShodanClient.prototype.shodanHostSearch = function (config, callback) {
  var partialQuery = '/shodan/host/search?',
    optional = ['facets', 'page', 'offset', 'limit', 'minify'],
    options;

  if (config.query) {
    partialQuery += 'query=' + config.query + '&';
    lodash.map(config, function (value, key) {
      // Drop not valid params
      if (optional.indexOf(key) !== -1) {
        partialQuery += key + '=' + value + '&';
      }
    });

    options = {
      partialQuery: partialQuery,
      key: this.key,
      timeout: this.timeout
    };
    utils.apiRequest(URL_STRING, options, callback);
  } else {
    callback({
      msg: 'The "query" parameter is mandatory'
    });
  }
};

// TODO: /shodan/host/search/tokens
// ShodanClient.prototype.shodanHostSearchTokens = function (config, callback) {
// TODO: /shodan/protocols
// ShodanClient.prototype.shodanProtocols = function (config, callback) {
// TODO: /shodan/scan
// ShodanClient.prototype.shodanScan = function (config, callback) {
// TODO: /shodan/scan/internet
// ShodanClient.prototype.shodanScanInternet = function (config, callback) {
// TODO: /shodan/scan/services
// ShodanClient.prototype.shodanServices = function (config, callback) {


// Account

// TODO: /account/profile
// ShodanClient.prototype.accountProfile = function (config, callback) {


// DNS

ShodanClient.prototype.dnsResolve = function (hostNames, callback) {
  var partialQuery = '/dns/resolve?',
    options;

  if (hostNames) {
    partialQuery += 'hostnames=' + hostNames + '&';
    options = {
      partialQuery: partialQuery,
      key: this.key,
      timeout: this.timeout
    };
    utils.apiRequest(URL_STRING, options, callback);
  } else {
    callback({
      msg: 'The "hotsNames" parameter is mandatory'
    });
  }
};


ShodanClient.prototype.dnsReverse = function (ips, callback) {
  var partialQuery = '/dns/reverse?',
    options;

  if (ips) {
    partialQuery += 'ips=' + ips + '&';
    options = {
      partialQuery: partialQuery,
      key: this.key,
      timeout: this.timeout
    };
    utils.apiRequest(URL_STRING, options, callback);
  } else {
    callback({
      msg: 'The "ips" parameter is mandatory'
    });
  }
};


// Utility

ShodanClient.prototype.toolsMyip = function (callback) {
  var partialQuery = '/tools/myip?',
    options = {
      partialQuery: partialQuery,
      key: this.key,
      timeout: this.timeout
    };

  utils.apiRequest(URL_STRING, options, callback);
};


// API status

// TODO: /api-info
// ShodanClient.prototype.apiInfo = function (config, callback) {


// Adding the rest of the requests to the main object

ShodanClient.prototype.popularSearch = function (cb) {
  popularReqs.search(this.timeout, cb);
};

ShodanClient.prototype.popularSearchByTag = function (tag, cb) {
  popularReqs.searchByTag(tag, this.timeout, cb);
};


ShodanClient.prototype.streamBanners = function (cb) {
  streamReqs.banner(this.timeout, this.key, cb);
};

ShodanClient.prototype.streamPorts =  function (portsString, cb) {
  var options = {
      key: this.key,
      timeout: this.timeout,
      ports: portsString
    };

  streamReqs.ports(options, cb);
};


ShodanClient.prototype.exploitSearch = function (options, cb) {
  // Re-using the object
  options.key = this.key;
  options.timeout = this.timeout;

  exploitReqs.search(options, cb);
};

ShodanClient.prototype.exploitCount = function (options, cb) {
  options.key = this.key;
  options.timeout = this.timeout;

  exploitReqs.count(options, cb);
};


module.exports = ShodanClient;
