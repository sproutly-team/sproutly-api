const MailerService = require('./MailerService')

const service = {
  async newSignup({ email, code, firstname }) {
    const mailPayload = {
      to: 'pietrosparks@gmail.com',
      subject: 'Welcome to Sproutly',
      payload: `Hi ${firstname}, Welcome to Sproutly. Your Confirmation Code is ${code}. Please click the link below (coming soon) to complete onboarding`
    }

    await MailerService.send(mailPayload)
  }
}

module.exports = service
