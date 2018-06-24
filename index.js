"use strict"

require('dotenv').config();

const dryg = require('./dryg');
const goodmorning = require('./goodmorning');
const slack = require('./slack');

const slackHookUrl = process.env.SLACK_HOOK_URL;

dryg.fetchDay(new Date())
  .then(function(day) {
    let message = goodmorning.buildMessage(day);

    return slack.sendMessage(slackHookUrl, message);
  })
  .then(function() {
    console.log('Message sent!');
  })
  .catch(function(err) {
    console.log(err)
  });
