# elbv2-log-parser


A basic parser for ELBv2 access logs, blatantly modified from node-elb-log-parser https://github.com/toshihirock/node-elb-log-parser.

## When I use this npm?

+ ELBv2 Access Log(S3)->Lambda->ElasticSearch. Example [awslabs/amazon-elasticsearch-lambda-samples](https://github.com/awslabs/amazon-elasticsearch-lambda-samples/blob/master/src/s3_lambda_es.js)
+ Analyze ELB Access Log


## Example API usage

```
$ node
> var parse = require('./index');
undefined
> parse('h2 2016-08-10T00:10:33.145057Z app/my-loadbalancer/50dc6c495c0c9188 10.0.1.252:48160 10.0.0.66:9000 0.000 0.002 0.000 200 200 5 257 "GET https://10.0.2.105:773/ HTTP/2.0" "curl/7.46.0" ECDHE-RSA-AES128-GCM-SHA256 TLSv1.2 arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067 "Root=1-58337327-72bd00b0343d75b906739c42"');
{ type: 'h2',
  timestamp: '2016-08-10T00:10:33.145057Z',
  elb: 'app/my-loadbalancer/50dc6c495c0c9188',
  client: '10.0.1.252',
  client_port: '48160',
  target: '10.0.0.66',
  request_processing_time: '0.000',
  target_processing_time: '0.002',
  response_processing_time: '0.000',
  elb_status_code: '200',
  target_status_code: '200',
  received_bytes: '5',
  sent_bytes: '257',
  request: 'GET https://10.0.2.105:773/ HTTP/2.0',
  user_agent: 'curl/7.46.0',
  ssl_cipher: 'ECDHE-RSA-AES128-GCM-SHA256',
  ssl_protocol: 'TLSv1.2',
  target_group_arn: 'arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067',
  trace_id: 'Root=1-58337327-72bd00b0343d75b906739c42',
  target_port: '9000',
  request_method: 'GET',
  request_uri: 'https://10.0.2.105:773/',
  request_http_version: 'HTTP/2.0',
  request_uri_scheme: 'https:',
  request_uri_host: '10.0.2.105',
  request_uri_port: '773',
  request_uri_path: '/',
  request_uri_query: null }
>
```

You get the idea.

## Tests

```
$npm test
```

## License

WTFPL
