var libxml = require('libxmljs');
var Response = require('./response');
var AuthorizeResponse = require('./authorize-response');

function ErrorResponse(xml) {
    var doc, error, response;
    response = new AuthorizeResponse();
    doc = libxml.parseXml(xml);
    error = doc.get('/error');
    response = new Response();
    response.error(error.text(), error.attr('code').value());

    return response;
}

module.exports = ErrorResponse;