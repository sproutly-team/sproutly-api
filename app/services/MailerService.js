const sgMail = require('@sendgrid/mail')
const isHtml = require('is-html')

class Service {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    this.mailer = sgMail
  }

  async send({ to, subject, payload }) {
    const msg = {
      to,
      subject,
      from: process.env.MAIL_SENDER
    }

    isHtml(payload) ? (msg.html = payload) : (msg.text = payload)
    try {
      await this.mailer.send(msg)
    } catch (err) {
      console.log(`error occured while sending mail: ${err.message}`)
    }
  }
}

module.exports = new Service()
