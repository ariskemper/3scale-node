var https = require('https');
var SuccessResponse = require('./success-response');
var ErrorResponse = require('./error-response');
var queryString = require('qs');
var assert = require('assert');
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

function AuthorizeRequest(options, cb) {
    var self = this,
        query, request, requestOptions;

    query = queryString.stringify(options.queryOptions);

    requestOptions = {
        hostname: options.host,
        port: 443,
        path: options.url + query,
        method: 'GET',
        headers: options.headers,
        agent: false
    };

    var responseCb = function(response) {
        var xml = '';
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            return xml += chunk;
        });

        return response.on('end', function() {
            var ref;
            if (response.statusCode === 200 || response.statusCode === 409) {
                return cb(new SuccessResponse(xml));
            } else if (ref = response.statusCode, __indexOf.call([400, 401, 402, 403, 404, 405, 406, 407, 408], ref) >= 0) {
                return cb(new ErrorResponse(xml));
            } else {
                throw options.errorMsg + response.statusCode;
            }
        });
    }

    var request = https.request(requestOptions, responseCb);
    request.end();
    request.on('error', function(err) {
        console.error(err);
    });

    return request;
}

module.exports = AuthorizeRequest;