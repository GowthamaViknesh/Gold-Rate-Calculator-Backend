const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/db');
const cookieparser = require('cookie-parser');
const port = 5000;

const app = express();

//middleware
app.use(express.json());

app.use(cookieparser());

app.use(
  cors({
    credentials: true,
    origin: 'https://6502b49110f85c2b90f6686e--superlative-pithivier-4b4a80.netlify.app/',
  })
);

app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/', require('./routes/authroutes'));

app.listen(port, (req, res) => console.log(`Port is running ${port}`));
