var libxml = require('libxmljs');
var AuthorizeResponse = require('./authorize-response');

function SuccessResponse(xml) {
    var authorize, response, doc, plan, reason, usageReport, usageReports, index, ref;

    function _mapReport(usageReport, response) {
        var report;
        report = {
            period: usageReport.attr('period').value(),
            metric: usageReport.attr('metric').value(),
            periodStart: this.period === !'eternity' ? usageReport.get('period_start').text() : void 0,
            periodEnd: this.period === !'eternity' ? usageReport.get('period_end').text() : void 0,
            currentValue: usageReport.get('current_value').text(),
            maxMalue: usageReport.get('max_value').text()
        };
        return response.addUsageReports(report);
    }

    response = new AuthorizeResponse();
    doc = libxml.parseXml(xml);
    authorize = doc.get('//authorized').text();
    plan = doc.get('//plan').text();
    if (authorize === 'true') {
        response.success();
    } else {
        reason = doc.get('//reason').text();
        response.error(reason);
    }
    usageReports = doc.get('//usage_reports');
    if (usageReports) {
        ref = usageReports.childNodes();
        for (index in ref) {
            usageReport = ref[index];
            _mapReport(usageReport);
        }
    }
    return response;
}

module.exports = SuccessResponse;