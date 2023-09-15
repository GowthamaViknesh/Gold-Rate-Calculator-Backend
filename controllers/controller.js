//Require plug-ins
const User = require('../models/models');
const Feedback = require('../models/feedbackmodel');
const Calculator = require('../models/calcmodel');
const jwt = require('jsonwebtoken');
const { hashedPassword, comparePassword } = require('../helpers/auth');
const nodemailer = require('nodemailer');
require('dotenv').config();

let OTP;

//Testing the port and server
const test = (req, res) => {
  res.json('test is working');
};

//Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, phone_no, password } = req.body;

    if (!name && !email && !phone_no && !password) {
      return res
        .status(200)
        .json({ status: false, message: 'Enter the details' });
    }

    if (!name) {
      return res.status(200).json({ status: false, message: 'Enter the Name' });
    }
    if (!password) {
      return res
        .status(200)
        .json({ status: false, message: 'Enter the password' });
    }
    if (!phone_no) {
      return res
        .status(200)
        .json({ status: false, message: 'Enter the Phone_No' });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(200)
        .json({ status: false, message: 'Email Already Exists' });
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    const hashPassword = await hashedPassword(password);
    setTimeout(async () => {
      await User.create({
        name,
        email,
        phone_no,
        password: hashPassword,
      });
      return res.status(201).json({
        status: true,
        message: 'User Created Successfully 👌❤️',
        token: token,
      });
    }, 1000);
  } catch (error) {
    res.status(200).json({ message: 'Someting Went Wrong!!' });
  }
};

//Login with credentials
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(200)
        .json({ status: false, message: 'Enter the details' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: 'No user found 🤷‍♀️' });
    }
    const match = await comparePassword(password, user.password);
    if (match) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      res
        .status(200)
        .json({ status: true, message: 'Welcome🙏😊', user, data: token });
    }
    if (!match) {
      res.json({ status: false, message: 'Password does not match!!' });
    }
  } catch (error) {
    console.log(error);
  }
};

//Get a user details
const getProfile = async (req, res) => {
  const { token } = req.body;
  if (token) {
    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        res.status(200).json({ status: false, message: 'User Not Found' });
      } else {
        res.status(201).json({
          status: true,
          name: user.name,
          email: user.email,
        });
      }
    } catch (error) {
      res.status(200).json({ status: false, message: 'Something Went Wrong' });
    }
  }
};

//FeedBack from users and it didnt have to signup
const getContact = async (req, res) => {
  try {
    const { name, email, phone_no } = req.body;

    if (!name && !email && !phone_no) {
      return res
        .status(200)
        .json({ status: false, message: 'Enter the details' });
    }

    if (!name) {
      return res.status(200).json({ status: false, message: 'Enter the Name' });
    }
    if (!phone_no) {
      return res
        .status(200)
        .json({ status: false, message: 'Enter the Phone No' });
    }

    const exist = await Feedback.findOne({ email });
    if (exist) {
      return res
        .status(200)
        .json({ status: true, message: 'Email already exists' });
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gowthampostbox30@gmail.com',
        pass: process.env.MAIL_KEY,
      },
    });

    var mailOptions = {
      from: 'gowthampostbox30@gmail.com',
      to: email,
      subject: 'Thank you for Contacting',
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
        crossorigin="anonymous"
        <title>Thanks Card</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

body {
  font-family: 'Dancing Script', cursive;
  margin: 0;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
}
.card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.5);
  max-width: 400px;
  display: flex;
  flex-direction: row;
  border-radius: 25px;
  position: relative;
}
.card h2 {
  margin: 0;
  padding: 0 1rem;
}
.card .title {
  padding: 1rem;
  text-align: right;
  color: green;
  font-weight: bold;
  font-size: 12px;
}
.card .desc {
  padding: 0.5rem 1rem;
  font-size: 12px;
}
.card .actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 0.5rem 1rem;
}
.card svg {
  width: 85px;
  height: 85px;
  margin: 0 auto;
}

.img-avatar {
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50%;
  border: 6px solid white;
  background-image: linear-gradient(-60deg, #16a085 0%, #f4d03f 100%);
  top: 15px;
  left: 85px;
}

.card-text {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.title-total {
  padding: 2.5em 1.5em 1.5em 1.5em;
}

path {
  fill: white;
}

.img-portada {
  width: 100%;
}

.portada {
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-image: url("https://images.unsplash.com/photo-1594709287485-447f40e8d7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80");
  background-position: bottom center;
  background-size: cover;
}

button {
  border: none;
  background: none;
  font-size: 24px;
  color: #8bc34a;
  cursor: pointer;
  transition:.5s;
  &:hover{
    color: #4CAF50  ;
    transform: rotate(22deg)
  }
}
</style>
      </head>
      <body>

      <div class="card">
  <div class="card-text">
    <div class="portada">
    
    </div>
    <div class="title-total">   
      <div class="title">Aura Jewells</div>
      <h2>${name}</h2>
  
  <div class="desc">Thanks for choosing us, we have many designs you can like it, check out our website or visit you nearest store</div>
  <div class="actions">
    <button><i class="far fa-heart"></i></button>
    <button><i class="far fa-envelope"></i></button>
    <button><i class="fas fa-user-friends"></i></button>
  </div>
 </div>
</div>
</div>
 <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
      crossorigin="anonymous"
    ></script>
      </body>
      </html>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    await Feedback.create({
      name,
      email,
      phone_no,
    });
    return res
      .status(201)
      .json({ status: true, message: 'We will get back soon!!🙏' });
  } catch (error) {
    console.error(error);
    res.status(200).json({ status: false, message: 'Something Went Wrong' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
  OTP = Math.floor(1000 + Math.random() * 9000);
  const existingUser = await User.findOne({ email });
  try {
    if (existingUser) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gowthampostbox30@gmail.com',
          pass: process.env.MAIL_KEY,
        },
      });

      const mailOption = {
        from: 'gowthampostbox30@gmail.com',
        to: existingUser.email,
        subject: `Welcome From Aura Jewlles Team - ${existingUser.name} `,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div>
            <h3>Hi ${existingUser.name},</h3> 
              <h3>You can Reset Your Password using Below OTP</h3>
            <h1>${OTP}</h1>
            <h3>Happy Shopping :) Aura-Jewells</h3>
               <img src="https://images.unsplash.com/photo-1571587289339-cb7da03fb5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80" width:"200px" height:"200px"  />
              
            </div>
        </body>
        </html>`,
      };

      transporter.sendMail(mailOption, (err) => {
        if (!err) {
          res.status(201).json({
            status: true,
            message: 'OTP Sended SuccessFully',
            data: token,
          });
        } else {
          res
            .status(205)
            .json({ status: false, message: 'Error in Sending OTP' });
        }
      });
    } else {
      res.json({ status: false, message: 'Please Register' });
    }
  } catch (error) {
    res.status(404).json({ message: '404 Page Not Found' });
  }
};

const verifyOTP = async (req, res) => {
  const { UserOTP } = req.body;
  try {
    if (UserOTP == OTP) {
      res.status(200).json({ status: true, message: 'OTP is Verified' });
    } else {
      res.status(200).json({ status: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(404).json({ message: '404 Page not Found' });
  }
};

//After sending the mail you get a link to reset
const resetPassword = async (req, res) => {
  const { password, confirmpassword, token } = req.body;
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const email = verify.email;

    if (password === confirmpassword) {
      const hashedpassword = await hashedPassword(password);
      await User.updateOne(
        {
          email: email,
        },
        {
          $set: {
            password: hashedpassword,
          },
        }
      );
      res.status(201).json({ status: true, message: 'Password Updated!!' });
    } else {
      res
        .status(200)
        .json({ status: false, message: 'Password should be same!!' });
    }
  } catch (error) {
    res.status(200).json({ status: false, message: 'Password reset failed' });
  }
};

//Save the calculator total in database
const saveCalc = async (req, res) => {
  const { token } = req.body;
  const { goldrate, gstgold, total } = req.body;
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(email);
    if (!goldrate || !gstgold || !total) {
      return res
        .status(200)
        .json({ status: false, message: 'Please check one more time' });
    } else {
      const calcData = await Calculator.findOne({ email });
      if (calcData) {
        // Update the existing document
        await Calculator.updateOne(
          { email: email },
          { $push: { data: { goldrate, gstgold, total } } }
        );
      } else {
        // Create a new document
        await Calculator.create({
          email,
          data: [{ goldrate, gstgold, total }],
        });
      }
      res.status(201).json({ status: true, message: 'Saved successfully' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(200).json({ status: false, message: 'Try again later' });
  }
};

//Get the data from calc save database
const getData = async (req, res) => {
  const { token } = req.body;
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    if (!email) {
      res.status(200).json({ status: false, message: 'Email is not defined' });
    }
    const calcsavedData = await Calculator.findOne({ email: email });
    if (!calcsavedData) {
      return res.status(404).json({ status: false, message: 'No data found' });
    } else {
      res.status(200).json({ status: true, data: calcsavedData });
    }
  } catch (error) {
    res.status(200).json({ status: false, message: 'Try later' });
  }
};

//Delete data database the calc collections
const deleteRecord = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    if (!email) {
      return res
        .status(200)
        .json({ status: false, message: 'Unauthorized: Invalid token' });
    }

    const calcData = await Calculator.findOne({ email });

    if (!calcData) {
      return res.status(200).json({ status: false, message: 'No data found' });
    }

    const { total } = req.body;
    if (!total) {
      return res
        .status(200)
        .json({ status: false, message: 'Please provide data to delete' });
    }

    const dataIndexToDelete = calcData.data.findIndex(
      (entry) => entry.total === total
    );

    if (dataIndexToDelete === -1) {
      return res
        .status(200)
        .json({ status: false, message: 'Data to delete not found' });
    }

    calcData.data.splice(dataIndexToDelete, 1);
    await calcData.save();
    res.status(201).json({
      status: true,
      message: 'Data deleted successfully',
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      status: false,
      message: 'Internal server error: Try again later',
    });
  }
};

//Export the modules to route
module.exports = {
  test,
  registerUser,
  loginUser,
  forgotPassword,
  getProfile,
  getContact,
  resetPassword,
  saveCalc,
  getData,
  deleteRecord,
  verifyOTP,
};
