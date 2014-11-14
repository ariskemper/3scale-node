var assert = require('assert');
var libxml = require('libxmljs');
var debug = require('debug')('sportradar:component:client');
var VERSION = require('./../package.json').version;
var AuthorizeRequest = require('./authorize-request');
var Request = require('./request');

module.exports = Client;

function Client (settings) {
    var self = this;

    if (!(self instanceof Client)) {
        return new Client(settings);
    }

    settings = settings || {};
    self.settings = settings;

    assert(self.settings.providerKey, 'missing providerKey');

    if (self.settings.host == null) {
        self.settings.host = "su1.3scale.net";
    }


    return {
        settings: self.settings,
        DEFAULT_HEADERS: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-3scale-User-Agent": "plugin-node-v0.5.0"
        },
        authorize: function(options, cb) {
            var self = this;

            assert.ok(options.appId, 'missing appId');
            assert.ok(options.appKey, 'missing appKey');
            assert.ok(cb, 'callback should be defined');

            options.host = self.settings.host;
            options.url = '/transactions/authorize.xml?';
            options.errorMsg = '[Client::authorize] Server Error Code: ';
            options.providerKey = self.settings.providerKey;
            options.headers = self.DEFAULT_HEADERS;

            options.queryOptions = {
                app_id: options.appId,
                app_key: options.appKey,
                provider_key: options.providerKey
            }

            return AuthorizeRequest(options, cb);
        },
        authorizeWithUserKey: function(options, cb) {
            var self = this;

            assert.ok(options.userKey, 'missing userKey');
            assert.ok(cb, 'callback should be defined');

            options.host = self.settings.host;
            options.url = '/transactions/authorize.xml?';
            options.errorMsg = '[Client::authorize] Server Error Code: ';
            options.providerKey = self.settings.providerKey;
            options.headers = self.DEFAULT_HEADERS;

            options.queryOptions = {
                user_key: options.userKey,
                provider_key: options.providerKey
            }

            return AuthorizeRequest(options, cb);
        },
        oAuthAuthorize: function(options, cb) {
            var self = this;

            assert.ok(options.appId, 'missing appId');
            assert.ok(options.appId, 'missing appKey');
            assert.ok(cb, 'callback should be defined');

            options.host = self.settings.host;
            options.url = '/transactions/oauth_authorize.xml?';
            options.errorMsg = '[Client::oAuthAuthorize] Server Error Code: ';
            options.providerKey = self.settings.providerKey;
            options.headers = self.DEFAULT_HEADERS;

            options.queryOptions = {
                app_id: options.appId,
                app_key: options.appKey,
                provider_key: options.providerKey
            }

            return AuthorizeRequest(options, cb);
        },
        report: function(options, cb) {
            var self = this;

            assert.ok(options.serviceId, 'serviceId should be defined');
            assert.ok(options.transaction, 'no transactions to report');
            assert.ok(cb, 'callback should be defined');

            options.host = self.settings.host;
            options.url = '/transactions.xml';
            options.providerKey = self.settings.providerKey;
            options.headers = self.DEFAULT_HEADERS;

            return Request(options, cb);
        }
    }
}