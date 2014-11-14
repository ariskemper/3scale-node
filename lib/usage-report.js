
function UsageReport(options) {
    return {
        metric: options.metric,
        period: options.period,
        currentValue: options.currentValue,
        maxValue: options.maxValue,
        periodStart: options.periodStart,
        periodEnd: options.periodEnd,
        isExceeded: function() {
            return this.currentValue > this.maxValue;
        }
    }
}

module.exports = UsageReport;

