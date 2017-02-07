var tap = require('tap');

var parse = require('./index.js')

tap.test('http traffic', function (t) {
  var parsed = parse(
    'http 2016-08-10T22:08:42.945958Z app/my-loadbalancer/50dc6c495c0c9188 192.168.131.39:2817 10.0.0.1:80 0.0000 0.001 0.0000 200 200 34 366 "GET http://www.example.com:80/ HTTP/1.1" "curl/7.46.0" - - arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067 "Root=1-58337262-36d228ad5d99923122bbe354"'
  );
  t.equal(parsed.type, 'http', 'we have type')
  t.equal(parsed.timestamp, '2016-08-10T22:08:42.945958Z', 'we have timestamp');
  t.equal(parsed.elb, 'app/my-loadbalancer/50dc6c495c0c9188', 'we have ELB');
  t.equal(parsed.client, '192.168.131.39', 'we have client');
  t.equal(parsed.client_port, '2817', 'we have client_port');
  t.equal(parsed.target, '10.0.0.1', 'we have target');
  t.equal(parsed.target_port, '80', 'we have target_port');
  t.equal(parsed.request_processing_time, '0.0000', 'we have request_processing_time');
  t.equal(parsed.target_processing_time, '0.001', 'we have target_processing_time');
  t.equal(parsed.response_processing_time, '0.0000', 'we have response_processing_time');
  t.equal(parsed.elb_status_code, '200', 'we have elb_status_code');
  t.equal(parsed.target_status_code, '200', 'we have target_status_code');
  t.equal(parsed.received_bytes, '34', 'we have received_bytes');
  t.equal(parsed.sent_bytes, '366', 'we have sent_bytes');
  t.equal(parsed.request, 'GET http://www.example.com:80/ HTTP/1.1', 'we have request');
  t.equal(parsed.request_method, 'GET', 'we have request_method');
  t.equal(parsed.request_uri, 'http://www.example.com:80/', 'we have request_uri');
  t.equal(parsed.request_http_version, 'HTTP/1.1', 'we have request_http_version');
  t.equal(parsed.request_uri_scheme, 'http:', 'we have request_uri_scheme');
  t.equal(parsed.request_uri_host, 'www.example.com', 'we have request_uri_host');
  t.equal(parsed.request_uri_port, '80', 'we have request_uri_port');
  t.equal(parsed.request_uri_path, '/', 'we have request_uri_path');
  t.equal(parsed.request_uri_query, null, 'we have request_uri_query');
  t.equal(parsed.user_agent, 'curl/7.46.0', 'we have user_agent');
  t.equal(parsed.ssl_cipher, '-', 'we have ssl_cipher');
  t.equal(parsed.ssl_protocol, '-', 'we have ssl_protocol');
  t.equal(parsed.target_group_arn, 'arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067', 'we have target_group_arn');
  t.equal(parsed.trace_id, 'Root=1-58337262-36d228ad5d99923122bbe354', 'we have trace_id');
  t.end();
});

tap.test('https traffic', function (t) {
  var parsed = parse(
    'https 2016-08-10T23:39:43.065466Z app/my-loadbalancer/50dc6c495c0c9188 192.168.131.39:2817 10.0.0.1:80 0.000086 0.001048 0.001337 200 200 0 57 "GET https://www.example.com:443/p/a/t/h?foo=bar&hoge=fuga HTTP/1.1" "curl/7.46.0" ECDHE-RSA-AES128-GCM-SHA256 TLSv1.2 arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067 "Root=1-58337281-1d84f3d73c47ec4e58577259"'
  );

  t.equal(parsed.type, 'https', 'we have type')
  t.equal(parsed.timestamp, '2016-08-10T23:39:43.065466Z', 'we have timestamp');
  t.equal(parsed.elb, 'app/my-loadbalancer/50dc6c495c0c9188', 'we have ELB');
  t.equal(parsed.client, '192.168.131.39', 'we have client');
  t.equal(parsed.client_port, '2817', 'we have client_port');
  t.equal(parsed.target, '10.0.0.1', 'we have target');
  t.equal(parsed.target_port, '80', 'we have target_port');
  t.equal(parsed.request_processing_time, '0.000086', 'we have request_processing_time');
  t.equal(parsed.target_processing_time, '0.001048', 'we have target_processing_time');
  t.equal(parsed.response_processing_time, '0.001337', 'we have response_processing_time');
  t.equal(parsed.elb_status_code, '200', 'we have elb_status_code');
  t.equal(parsed.target_status_code, '200', 'we have target_status_code');
  t.equal(parsed.received_bytes, '0', 'we have received_bytes');
  t.equal(parsed.sent_bytes, '57', 'we have sent_bytes');
  t.equal(parsed.request, 'GET https://www.example.com:443/p/a/t/h?foo=bar&hoge=fuga HTTP/1.1', 'we have request');
  t.equal(parsed.request_method, 'GET', 'we have request_method');
  t.equal(parsed.request_uri, 'https://www.example.com:443/p/a/t/h?foo=bar&hoge=fuga', 'we have request_uri');
  t.equal(parsed.request_http_version, 'HTTP/1.1', 'we have request_http_version');
  t.equal(parsed.request_uri_scheme, 'https:', 'we have request_uri_scheme');
  t.equal(parsed.request_uri_host, 'www.example.com', 'we have request_uri_host');
  t.equal(parsed.request_uri_port, '443', 'we have request_uri_port');
  t.equal(parsed.request_uri_path, '/p/a/t/h', 'we have request_uri_path');
  t.equal(parsed.request_uri_query, 'foo=bar&hoge=fuga', 'we have request_uri_query');
  t.equal(parsed.user_agent, 'curl/7.46.0', 'we have user_agent');
  t.equal(parsed.ssl_cipher, 'ECDHE-RSA-AES128-GCM-SHA256', 'we have ssl_cipher');
  t.equal(parsed.ssl_protocol, 'TLSv1.2', 'we have ssl_protocol');
  t.equal(parsed.target_group_arn, 'arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067', 'we have target_group_arn');
  t.equal(parsed.trace_id, 'Root=1-58337281-1d84f3d73c47ec4e58577259', 'we have trace_id');
  t.end();
});

tap.test('http/2 traffic', function (t) {
  var parsed = parse(
    'h2 2016-08-10T00:10:33.145057Z app/my-loadbalancer/50dc6c495c0c9188 10.0.1.252:48160 10.0.0.66:9000 0.000 0.002 0.000 200 200 5 257 "GET https://10.0.2.105:773/ HTTP/2.0" "curl/7.46.0" ECDHE-RSA-AES128-GCM-SHA256 TLSv1.2 arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067 "Root=1-58337327-72bd00b0343d75b906739c42"'
  );
  t.equal(parsed.type, 'h2', 'we have request');
  t.end();
});

tap.test('websockets traffic', function (t) {
  var parsed = parse(
    'ws 2016-08-10T00:32:08.923954Z app/my-loadbalancer/50dc6c495c0c9188 10.0.0.140:40914 10.0.1.192:8010 0.001 0.003 0.000 101 101 218 587 "GET http://10.0.0.30:80/ HTTP/1.1" "-" - - arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067 "Root=1-58337364-23a8c76965a2ef7629b185e3"'
  );
  t.equal(parsed.type, 'ws', 'we have request');
  t.end();
});

tap.test('secure websockets traffic', function (t) {
  var parsed = parse(
    'wss 2016-08-10T00:42:46.423695Z app/my-loadbalancer/50dc6c495c0c9188 10.0.0.140:44244 10.0.0.171:8010 0.000 0.001 0.000 101 101 218 786 "GET https://10.0.0.30:443/ HTTP/1.1" "-" ECDHE-RSA-AES128-GCM-SHA256 TLSv1.2 arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067 "Root=1-58337364-23a8c76965a2ef7629b185e3"'
  );
  t.equal(parsed.type, 'wss', 'we have request');
  t.end();
});


/*

tap.test('doesn\'t receive traffic ', function (t) {
  var parsed = parse(
    '2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 -1 0.001065 0.000015 0.000023 - - 57 502 "- - - " "-" ECDHE-ECDSA-AES128-GCM-SHA256 TLSv1.2'
  );
  t.equal(parsed.backend, '-1', 'we have backend');
  t.equal(parsed.backend_port, '-1', 'we have backend_port');
  t.end();
});
*/