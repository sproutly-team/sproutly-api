const dotenv = require('dotenv');
const express = require('express');

const app = express();

dotenv.config({ path: '.env' });
require('./config')(app, express);

module.exports = app;
