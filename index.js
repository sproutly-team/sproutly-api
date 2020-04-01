const express = require('express')
const bodyParser = require('body-parser')
const Sentry = require("@sentry/node");
const dotenv = require("dotenv-safe");

dotenv.config({});
const app = express()
const port = 3000

const db = require('./config/queries');
Sentry.init({
  dsn: process.env.SENTRY_URL
});


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// app.use('/api', apiRouter)
const router = require("./app/routes");

app.use("/api/v1/newsletter", router.newsLetter);
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/users', db.getUsers)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
    })