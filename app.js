const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const PORT = 3000;

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URI);

const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to database"));

const subscriberRouter = require('./routes/subscribers');
app.use('/subscribers', subscriberRouter);


app.listen(PORT, () => console.log("Server Started"));