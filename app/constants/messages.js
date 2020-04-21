const errorMessages = {
  INVALID_INPUT_PARAMS: 'Invalid input parameters.',
  INVALID_AUTH_TOKEN: 'Auth token is invalid.',
  PASSWORD_MISMATCH: 'Sorry, passwords do not match',
  LOGIN_ERROR: 'The email and password do not match an account.',
  AUTH_ERROR: 'Sorry, your request could not be authenticated',
  INTERNAL_SERVER_ERROR: 'The request was not completed.',
  INVALID_PASSWORD: 'Invalid password.',
  USER_EMAIL_DUPLICATED: 'Sorry, this email is already registered to a user.',
  ACCOUNT_NOT_EXIST: 'The account does not exist.',
  INVALID_OLD_PASSWORD: 'Old password does not match!',
  DATA_NOT_EXIST: 'The data does not exists.',
  SOMETHING_WENT_WRONG: 'Something went wrong, please try again.',
  INVALID_EMAIL: 'You did not enter a valid email',
  PASSWORD_TOO_SHORT: 'Your password must be more than 5 characters.',
  CONFIRM_PASSWORD: 'Please confirm your password'
}


const successMessages = {
  USER_CREATED: 'User has been created.',
  USER_SIGNED_IN: 'User has been signed in.'
}

module.exports = {
  errorMessages,
  successMessages
}