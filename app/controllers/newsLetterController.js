const {emptyObject} = require("../services/UtilServices");
const { NewsLetterEmail } = require("../models");

module.exports = {
  async saveNewEmail(req, res) {
    try {
      const { email } = req.body;
      if (emptyObject(email))
        return res
          .status(400)
          .json({ message: "Oops!!! We didn't get that email" });

      const existingEmail = await NewsLetterEmail.findOne({ where: { email } });
      if (existingEmail)
        return res.status(400).json({ message: "Email already exists" });

      await NewsLetterEmail.create({ email });
      return res.status(200).json({ message: "email saved!" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "An error occurred", error: error.toString() });
    }
  },
  async viewAllEmails(req, res) {
    try {
      const { filter } = req.query;
      const query = {};
      if (filter !== "all") {
        if (filter == "unsubscribed") query.subscribed = false;
        if (filter == "subscribed") query.subscribed = true;
      }
      const emails = await NewsLetterEmail.findAll({ where: query });

      if (!emails.length)
        return res.status(400).json({ message: "No emails found" });

      return res.status(200).json({ message: "emails found", data: emails });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "An error occurred", error: error.toString() });
    }
  },

  async updateSubscription(req, res) {
    try {
      const { email, value } = req.body;

      const requestedEmail = await NewsLetterEmail.findOne({
        where: { email }
      });

      if (!requestedEmail)
        return res.status(400).json({ message: "invalid email" });

      if (value == "subscribe") requestedEmail.subscribed = true;

      if (value == "unsubscribe") requestedEmail.subscribed = false;

      await requestedEmail.save();
      return res.status(200).json({ message: "subscription updated" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "An error occurred", error: error.toString() });
    }
  }
};
