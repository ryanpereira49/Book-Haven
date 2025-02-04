const {
  validateUsername,
  validateEmail,
  validatePassword,
} = require("../helper/validation");
const { hashPassword, comparePasswords } = require("../helper/hashing");
const User = require("../models/User");
const jwt = require('jsonwebtoken')
const session = require('express-session');

/*
    OUT - "JSON/String"
*/
const helloworld = (req, res) => {
  res.json("Hello World!");
};


/*
    IN - Username, Password
    OUT - Password
*/
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username) {
      res.json({ error: "Username is required" });
    }
    if (!password) {
      res.json({ error: "Password is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    const match = await comparePasswords(password, user.password);

    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
	    req.session.token = token;
          res.json({success: user});
        }
      );
    }
    if (!match) {
      res.json({
        error: "Password do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};


/* 
    IN - Username, Email, Password 
    OUT - Username
*/
const register = async (req, res) => {
  const { username, email, password } = req.body;

  const v_username = await validateUsername(username);
  const v_email = await validateEmail(email);
  const v_password = await validatePassword(password);

  if (
    v_username.status === true &&
    v_email.status === true &&
    v_password.status === true
  ) {
    const hashedPassword = await hashPassword(password);

    try {
      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });

      if(user){
        jwt.sign(
          { email: user.email, id: user._id, username: user.username, role: user.role },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            req.session.token = token;            
	      res.json({success: user});
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  } else if (v_username.status === false) {
    return res.json({error: v_username.message});
  } else if (v_email.status === false) {
    return res.json({error: v_email.message});
  } else if (v_password.status === false) {
    return res.json({error: v_password.message});
  } else {
    return res.status(400).json("Internal Server Error");
  }
};

const logout = async(req,res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send('Logged out');
  });}

const getProfile = (req,res) => {
  const {token} = req.session
  if(token){
      jwt.verify(token,process.env.JWT_SECRET,{}, (err,user) => {
          if(err) throw(err)
          res.json(user)
      })
  }else{
      res.json(null)
  }
}

module.exports = {
  helloworld,
  login,
  register,
  logout,
  getProfile
};
