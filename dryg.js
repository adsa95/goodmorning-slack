const request = require('request-promise');
const url = require('url');

function fetchDay(date) {
  let dateUrl = 'http://api.dryg.net/dagar/v2.1/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
  let options = {
    method: 'GET',
    url: url.parse(dateUrl),
    json: true
  };

  return new Promise((resolve, reject) => {
    request(options)
      .then(function(data) {
        let day = buildDayObject(data.dagar[0]);

        resolve(day);
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

function buildDayObject(data) {
  return {
    weekday: data.veckodag,
    week: parseInt(data.vecka),
    holiday: data.hasOwnProperty('helgdag') ? data.helgdag : null,
    nameDays: data.namnsdag
  }
}

exports.fetchDay = fetchDay;
