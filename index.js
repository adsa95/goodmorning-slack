/*
    Created by Adam Sandström
    adsa95@gmail.com
    (c) 2017
                                */

"use strict"

require('dotenv').config();

const request = require('request');
const querystring = require('querystring');
const url = require('url');

let today = new Date();
let todayUrl = 'http://api.dryg.net/dagar/v2.1/' + today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

console.log(todayUrl);

request({
    method: 'GET',
    url: url.parse(todayUrl),
    json: true
}, function(err, res, body){
    if(err) throw err;

    let message = getMessage(body.dagar[0]);
    console.log(message);

    request({
        method: 'POST',
        url: url.parse(process.env.SLACK_HOOK_URL),
        json: true,
        body: {text: message}
    }, function(err2, res2, body2){
        if(err) throw err;
        if(body2 == 'ok') console.log('Message sent');
    })
})

function getMessage(data){
    let str = 'Godmorgon! Idag är det ' + data.veckodag.toLowerCase() + ' vecka ' + parseInt(data.vecka);

    if(data.hasOwnProperty('helgdag')){
        str += ', men även ' + data.helgdag;
    }

    str += '. Glöm inte att gratta ' + getNameString(data.namnsdag) + ' på namnsdagen, ha en bra dag!';

     return str;
}

function getNameString(names){
    let str = "";

    for (var i = 0; i < names.length; i++) {
        if(i == 0){
            str += names[i];
        }else if(i == names.length - 1){
            str += ' och ' + names[i];
        }else{
            str += ', ' + names[i];
        }
    }

    return str;
}
