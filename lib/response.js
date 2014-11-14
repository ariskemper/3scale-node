function Response() {
    this.errorMsg = null;
    this.errorCode = null;
}

Response.prototype.success = function() {
    this.errorCode = null;
    return this.errorMsg = null;
}

Response.prototype.error = function(message, code) {
    if (code == null) {
        code = null;
    }
    this.errorCode = code;
    return this.errorMsg = message;
}

Response.prototype.isSuccess = function() {
    return (this.errorCode === null) && (this.errorMsg === null);
}

module.exports = Response;