require('dotenv').config();

const express = require('express');
const routes = require('./api/routes/index');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}!`);
});
