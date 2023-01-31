const express = require("express");
const { response } = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require('../../models/usermodel');
const Token = require('../../models/tokenModel');
const Observer = require('../../models/observerModel');
const Report = require('../../models/reportsModel');
var nodemailer = require('nodemailer');
const { findByIdAndDelete } = require("../../models/usermodel");

router.post('/signup', async (req, res) => {
  const { username, full_name, email, password, fan_of } = req.body;
  if (!username || !full_name || !email || !password || !fan_of) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({ username, full_name, email, password: hash, fan_of, social_media: ["", ""] });
    console.log(newUser);

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong while saving the user');

    res.status(200).json({
      user: {
        id: savedUser.id,
        username: savedUser.username,
        full_name: savedUser.full_name,
        email: savedUser.email,
        fan_of: savedUser.fan_of,
        social_media: ["", ""]
      }
    });

  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
);

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) throw Error('User does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        fan_of: user.fan_of
      }
    });

  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}
);

router.post('/observerLogin', async (req, res) => {
  const { observerid, password } = req.body;
  if (!observerid || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {

    const observer = await Observer.findOne({ observer_id: observerid });
    if (!observer) throw Error('Observer does not exist');

    if (password !== observer.password) {

      throw Error('Invalid credentials');
    }
    res.status(200).json({
      observer: {
        id: observer.observer_id,
      }
    });

  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}
);

router.post('/forgotpassword', async (req, res) => {

  const { email } = req.body;
  //console.log("email", email);

  try {

    const user = await User.findOne({ email: email });

    if (!user) {

      return res.status(200).json({ msg: 'Invalid email' });
    }

    res.status(200).json({
      user: {
        email: user.email,
      }
    });

    // form new token 
    let token = await Token.findOne({ user_id: user._id });
    if (!token) {

      token = await new Token({
        user_id: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

    }

    // send email

    const url = `${process.env.REACT_APP_URL}/login/reset-password/${token.user_id}/${token.token}/`;
    console.log("url:", url);
    console.log("email", user.email);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'refmes.org@gmail.com',
        pass: 'deuerygiggvzlkga'
      }
    });

    var mailOptions = {
      from: 'refmes.org@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      //text: url,<h4>To reset your password, please got to the below link and write your new password.</h4>
      html: `<h4>To reset your password, please got to the below link and write your new password.</h4> <a href = ${url}>reset-password</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  } catch (e) {
    res.status(400).json({ msg: e.message });
  }

});

router.get('/linkchecker/:user_id/:token', async (req, res) => {

  const user_id = req.params.user_id;
  const token = req.params.token;

  //console.log("user_id", user_id);
  //console.log("token", token);

  const _token = await Token.findOne({ user_id: user_id });

  if (!_token) {

    return res.status(200).json({ msg: 'Invalid user_id' });

  }
  else if (token !== _token.token) {

    return res.status(200).json({ msg: 'Invalid token' });

  }
  else {

    res.status(200).json({
      token: {
        user_id: _token.user_id,
        token: _token.token
      }
    });

  }

});


router.post('/reset-password', async (req, res) => {

  const BCRYPT_SALT_ROUNDS = 10;
  const user_id = req.body._id;
  const password = req.body.password;

  //console.log("user id:", user_id);
  //console.log("password: ", password);

  //update password

  bcrypt.genSalt(BCRYPT_SALT_ROUNDS, function (saltError, salt) {
    if (saltError) {
      return saltError
    }
    else {

      bcrypt.hash(password, salt, function (hashError, hash) {
        if (hashError) {
          return hashError
        }
        //console.log(hash);
        console.log("new password", hash);
        User.findOneAndUpdate({ "_id": user_id }, { password: hash }).then(() => {
          res.status(200).json({ msg: "update new password is finish" });
        });
        //console.log("password is updated");
        //return res.status(200).json({msg: "update new password is finish"});

      });

    }
  });

  // delete token
  await Token.findOneAndDelete({ user_id: user_id });

});

router.post('/registerReport', async(req, res)=> {

  //console.log("in backend");
  const username = req.body.username;
  const report = req.body.report;

  //console.log("username", username);
  //console.log("report", report);

  const user = await User.findOne({username: username});

  const newreport = new Report({
    user_id: user._id,
    user_email: user.email,
    user_message: report

  });

  //console.log("new report", newreport);

  await newreport.save();
  return res.status(200).json(newreport);

});

router.post("/delete", async(req, res) => {
    const {id, username, email} =req.body;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post("/updatesetting", async (req, res) => {

  var result = await User.findOne({ username: req.body.username })
  console.log(result);
  if (result) {
    return res.status(200).json({ msg: "Username exist,try again." });
  }
  else {
    await User.findOneAndUpdate({ email: req.body.email },
      {
        username: req.body.username,
        full_name: req.body.full_name,
        social_media: [req.body.twitter, req.body.insta]
      }).then(result => {
        res.status(200).json(result);
      }).catch(err => {
        console.log(err);
        res.status(400).json({ msg: err.message });
      });
  }


}
);

router.post("/change-password", async (req, res) => {
  const BCRYPT_SALT_ROUNDS = 10;
  let myQuery = { "email": req.body.usermail }
  console.log("Current user email:", req.body.usermail)

  User.findOne(myQuery, async (err, result) => {
    if (err) {
    } else if (result) {
      const validPassword = await bcrypt.compare(req.body.currentPassword.toString(), result.password);
      if (validPassword) {

        bcrypt.genSalt(BCRYPT_SALT_ROUNDS, function (saltError, salt) {
          if (saltError) {
            return saltError
          }
          else {
            bcrypt.hash(req.body.password, salt, function (hashError, hash) {
              if (hashError) {
                return hashError
              }
              User.findOneAndUpdate({ "email": currUser.user.email }, { password: hash }).then(() => {
                res.status(200).json(hash);
              });
            });
          }
        });

      } else {
        res.status(200).json({ message: "Current password is invalid,check again." });
      }
    } else {
      res.status(200).json({ message: "Error! Please try again." });
    }
  });
}
);
router.get("/getuserInfo/:userID", async (req, res) => {
  const user_id = req.params.userID
  await User.findById(user_id).then((result) => {
    console.log(result)
    res.status(200).json(result);
  }).catch(err => {
    console.log(err);
  });
}
);
router.get("/getuserbyUsername/:userName", async (req, res) => {
  const user_name = req.params.userName
  console.log(user_name);
  await User.findOne({ username: user_name }).then((result) => {
    console.log(result)
    res.status(200).json(result);
  }).catch(err => {
    console.log(err);
  });
}
);
module.exports = router;