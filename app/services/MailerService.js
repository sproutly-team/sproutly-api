const sgMail = require('@sendgrid/mail');
const isHtml = require('is-html');
const Logger = require('./LogService');

class Service {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    this.mailer = sgMail;
  }

  async send({ to, subject, payload }) {
    const msg = {
      to,
      subject,
      from: process.env.MAIL_SENDER
    };

    if (isHtml(payload)) msg.html = payload;
    else msg.text = payload;

    try {
      await this.mailer.send(msg);
    } catch (err) {
      Logger.error(`error occured while sending mail: ${err.message}`);
    }
  }
}

module.exports = new Service();
