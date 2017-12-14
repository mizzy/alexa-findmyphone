'use strict';

const Alexa = require('alexa-sdk');
const phone = require('./phone');
const twilio = require('twilio');
const client = new twilio(
    process.env.ACCOUNT_SID,
    process.env.AUTH_TOKEN
);

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = process.env.APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', '誰のスマホを探しますか');
    },

    'FindMyPhoneIntent': function () {
        var name = this.event.request.intent.slots.Name.value;
        var number = '+81' + phone.number[name];

        client.calls.create({
            to: number,
            from: process.env.PHONE_NUMBER,
            url: "http://demo.twilio.com/docs/voice.xml"
        }).then(() => {
            console.log(name);
            this.emit(':tell', name + 'のスマホを鳴らしています');
        });
    }
};
