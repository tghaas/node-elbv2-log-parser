#! /usr/bin/env node
module.exports = function (line) {
  var parsed = {};
  var url = require('url');

  var request_labels = 
  [
    'request_method',
    'request_uri',
    'request_http_version',
    'request_uri_scheme',
    'request_uri_host',
    'request_uri_port',
    'request_uri_path',
    'request_uri_query'
  ];

  //
  // Trailing newline? NOTHX
  //
  if (line.match(/\n$/)) {
    line = line.slice(0, line.length - 1);
  }

  [
    { 'type'                        : ' '   },
    { 'timestamp'                   : ' '   },
    { 'elb'                         : ' '   },
    { 'client'                      : ':'   },
    { 'client_port'                 : ' '   },
    { 'target'                      : ' '   },
    { 'request_processing_time'     : ' '   },
    { 'target_processing_time'      : ' '   },
    { 'response_processing_time'    : ' '   },
    { 'elb_status_code'             : ' '   },
    { 'target_status_code'          : ' '   },
    { 'received_bytes'              : ' '   },
    { 'sent_bytes'                  : ' "'  },
    { 'request'                     : '" "' },
    { 'user_agent'                  : '" '  },
    { 'ssl_cipher'                  : ' '   },
    { 'ssl_protocol'                : ' '   },
    { 'target_group_arn'            : ' "'   },
    { 'trace_id'                    : '"'   },
  ].some(function (t) {
    var label = Object.keys(t)[0];
    delimiter = t[label]
    var m = line.match(delimiter);
    if (m === null) {
      //
      // No match. Try to pick off the last element.
      //
      m = line.match(delimiter.slice(0, 1));

      if (m === null) {
        field = line;
      }
      else {
        field = line.substr(0, m.index);
      }

      parsed[label] = field;

      return true;
    }
    field = line.substr(0, m.index);
    line = line.substr(m.index + delimiter.length);
    parsed[label] = field;
  });

  // target
  if(parsed.target != -1) {
    parsed['target_port'] = parsed.target.split(":")[1];
    parsed['target'] = parsed.target.split(":")[0];
  } else {
    parsed['target_port'] = '-1';
  }

  // request
  if(parsed.request != '- - - ') {
    var i = 0;
    var method = parsed.request.split(" ")[0];
    var url = url.parse(parsed.request.split(" ")[1]);
    var http_version = parsed.request.split(" ")[2];

    parsed[request_labels[i]] = method;
    i++;
    parsed[request_labels[i]] = url.href;
    i++;
    parsed[request_labels[i]] = http_version;
    i++;
    parsed[request_labels[i]] = url.protocol;
    i++;
    parsed[request_labels[i]] = url.hostname;
    i++;
    parsed[request_labels[i]] = url.port;
    i++;
    parsed[request_labels[i]] = url.pathname;
    i++;
    parsed[request_labels[i]] = url.query;

  } else {
    request_labels.forEach(function(label) {
      parsed[label] = '-';
    });
  }

  return parsed;
};

if (require.main === module) {
  var split = require('split');
  var Transform = require('stream').Transform;
  process.stdin
    .pipe(split())
    .pipe(new Transform({
      decodeStrings: false,
      transform: function (line, encoding, callback) {
        if (line) {
          this.push(JSON.stringify(module.exports(line)) + '\n');
        }
        callback();
      }
    }))
    .pipe(process.stdout);
}