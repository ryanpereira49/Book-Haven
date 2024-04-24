const {
  validateUsername,
  validateEmail,
  validatePassword,
} = require("../helper/validation");
const { hashPassword, comparePasswords } = require("../helper/hashing");
const User = require("../models/User");
const jwt = require('jsonwebtoken')

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
      res.json({ message: "Username is required" });
    }
    if (!password) {
      res.json({ message: "Password is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: "No user found",
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
          res.cookie("token", token).json(user.username);
        }
      );
    }
    if (!match) {
      res.json({
        message: "Password do not match",
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

  v_username = await validateUsername(username);
  v_email = await validateEmail(email);
  v_password = await validatePassword(password);

  if (
    v_username.status === true &&
    v_email.status === true &&
    v_password.status === true
  ) {
    const hashedPassword = await hashPassword(password);

    try {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.json(user.username);
    } catch (error) {
      console.log(error);
    }
  } else if (v_username.status === false) {
    return res.json(v_username.message);
  } else if (v_email.status === false) {
    return res.json(v_email.message);
  } else if (v_password.status === false) {
    return res.json(v_password.message);
  } else {
    return res.json("Internal Server Error");
  }
};

module.exports = {
  helloworld,
  login,
  register,
};
