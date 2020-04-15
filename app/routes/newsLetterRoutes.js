const express = require("express");
const router = express.Router();
const newsLetter = require('../controllers/newsLetterController');

// newsLetter Routes

router.post("/save", newsLetter.saveNewEmail);
router.get("/view-all", newsLetter.viewAllEmails);
router.put("/update-subscription", newsLetter.updateSubscription);

module.exports = router;
