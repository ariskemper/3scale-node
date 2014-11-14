var Response = require('./response');
var UsageReport = require('./usage-report');
var util = require('util');


function AuthorizeResponse (usageReports) {
    this.usageReports = usageReports || [];
}

util.inherits(AuthorizeResponse, Response);

AuthorizeResponse.prototype.addUsageReports = function(options) {
    return this.usageReports.push(new UsageReport(options));
}

module.exports = AuthorizeResponse;