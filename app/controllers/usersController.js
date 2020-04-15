const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const dotenv = require ('dotenv');
const { emptyObject } = require("../services/UtilServices");
const { User } = require("../models");
const { errorResponse, successResponse } = require("../services/responseService")
const { successMessages, errorMessages } = require("../constants/messages")
const { codes } = require("../constants/code")


dotenv.config();
const saltRound = 13;

const getAllUsers = async(req, res) => {
  let users;
  try {
    users = await User.findAll()
  } catch (error) {
    return errorResponse(res, error, codes.INTERNAL_SERVER_ERROR, errorMessages.SOMETHING_WENT_WRONG)
  }
  return successResponse(res, users, codes.OK)
}

const signUp = async(req, res) => {
  const { email, firstName, lastName, password, username } = req.body;
  const hashPassword = bcrypt.hashSync(password, saltRound);
  let user, created

  console.log("email>>>>", email)
  try {
    [user, created] = await User.findOrCreate({
      where: { email: email.toLowerCase() },
      defaults: {
        firstName,
        lastName,
        username,
        email: email.toLowerCase(),
        password: hashPassword
       }
    });
  } catch(error) {
    return errorResponse(res, error, codes.INTERNAL_SERVER_ERROR, errorMessages.SOMETHING_WENT_WRONG)
  }

  if (created) return successResponse(res, user, codes.OK, successMessages.USER_CREATED)
  return errorResponse(res, "", codes.BAD_REQUEST, errorMessages.USER_EMAIL_DUPLICATED)
}

const signIn = async(req, res) => {
  const { email, password } = req.body;

  try {
    user = await User.findOne({
      where: { email: email.toLowerCase() }
    });
  } catch(error) {
    return errorResponse(res, error, codes.INTERNAL_SERVER_ERROR, errorMessages.SOMETHING_WENT_WRONG)
  }

  if (!user) return errorResponse(res, "", codes.NOT_FOUND, errorMessages.LOGIN_ERROR)

  bcrypt.compare(password, user.password, (err, hash) => {
    if (!hash) return errorResponse(res, "", codes.NOT_FOUND, errorMessages.LOGIN_ERROR)
    let userId = user.id
    let token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
      expiresIn: 60*60
    })
    return successResponse(res, { user, token }, codes.OK, successMessages.USER_SIGNED_IN)
  })
}

module.exports = {
  getAllUsers,
  signUp,
  signIn
}
