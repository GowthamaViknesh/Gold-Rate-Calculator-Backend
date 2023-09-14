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
    origin: 'http://localhost:3000',
  })
);

app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/', require('./routes/authroutes'));

app.listen(port, (req, res) => console.log(`Port is running ${port}`));
