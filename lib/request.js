var https = require('https');
var Response = require('./response');
var ErrorResponse = require('./error-response');
var queryString = require('qs');
var assert = require('assert');

function Request(options, cb) {
    var self = this,
        params, queryOptions, query, request, requestOptions, key, ref, value;

    params = {
        transactions: options.transaction,
        provider_key: options.providerKey
    };

    if (options.serviceId) {
        params.service_id = options.serviceId;
    }

    query = queryString.stringify(params).replace(/\[/g, "%5B").replace(/\]/g, "%5D");

    requestOptions = {
        host: options.host,
        port: 443,
        path: options.url,
        method: 'POST',
        headers: {
            "host": options.host,
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": query.length
        }
    };

    ref = options.headers;
    for (key in ref) {
        value = ref[key];
        requestOptions.headers[key] = value;
    }

    var responseCb = function(response) {
        var xml = '';
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            return xml += chunk;
        });

        return response.on('end', function() {
            if (response.statusCode === 202) {
                response = new Response();
                response.success();
                return cb(response);
            } else if (response.statusCode === 403) {
                return cb(new ErrorResponse(xml));
            }
        });
    }

    request = https.request(requestOptions, responseCb);
    request.on('error', function(err) {
        console.error(err);
    });
    request.write(query);
    return request.end();
}

module.exports = Request;