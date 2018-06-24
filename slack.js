const request = require('request-promise');
const url = require('url');

function sendMessage(webHookUrl, message) {
  let options = {
    method: 'POST',
    url: url.parse(webHookUrl),
    body: {text: message},
    json: true
  };

  return request(options);
}

exports.sendMessage = sendMessage;
