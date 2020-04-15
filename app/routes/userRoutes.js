const express = require("express");
const users = require('../controllers/usersController');
const {validate} = require('../middlewares/authValidator')
const router = express.Router();


// users Routes

router.get("/all", users.getAllUsers);
router.post("/signup", validate.signUpValidator, users.signUp);
router.post("/signin", users.signIn);

module.exports =  router;
