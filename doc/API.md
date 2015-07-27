# Module API

## `Metasploit` Object
The main object creation takes the following fields:
- `key` (string): Your Shodan API key, mandatory except for popular searches related functions.
- `timeout` (number): The time to wait for a valid response.


## Methods

### `shodanHost(config)`
- `config`: Object
 - `query (String)`: 'asterisk',
   // query: 'asterisk port:5060',
   // query: encodeURIComponent('openssh port:22'),
   // query: 'openssh+port%3A22',
   // query: 'penssh%20port%3A22',
   limit: 5,
   // facets: 'port:100',
   minify: false

### `shodanHostCount()`
By calling the library as a function it performs the WebRTC check in the browser. This function MUST be called before attempting to use the library.

It returns `true` if the browser supports WebRTC.