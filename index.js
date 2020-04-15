const express = require('express')
const bodyParser = require('body-parser')
const Sentry = require("@sentry/node");
const dotenv = require("dotenv-safe");
const cors = require("cors");
const router = require("./app/routes");

dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

const db = require('./config/queries');
Sentry.init({
  dsn: process.env.SENTRY_URL
});

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// app.use('/api', apiRouter)

app.use("/api/v1/newsletter", router.newsLetter);
app.use("/api/v1/users", router.users);
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
    })