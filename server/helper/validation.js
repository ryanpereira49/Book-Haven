const User = require("../models/User");

async function validateUsername(username) {
  if (!username) {
    return { status: false, message: "Username is required" };
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return { status: false, message: "Username already exists" };
  }

  return { status: true, message: "Username validation passed" };
};



async function validateEmail(email){
  if (!email) {
    return { status: false, message: "Email is required" };
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return { status: false, message: "Email already exists" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regpass = emailRegex.test(email);
  if (!regpass) {
    return { status: false, message: "Invalid email address" };
  }

  return { status: true, message: "email validation passed" };
};

    

function validatePassword(password){
  if (!password) {
    return { status: false, message: "Password is required" };
  }

  if (password.length < 8) {
    return {
      status: false,
      message: "Password must be at least 8 characters long",
    };
  }

  if (!/\d/.test(password)) {
    return {
      status: false,
      message: "Password must contain at least one digit",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      status: false,
      message: "Password must contain at least one uppercase character",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      status: false,
      message: "Password must contain at least one lowercase character",
    };
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
    return {
      status: false,
      message: "Password must contain at least one special character",
    };
  }

  return { status: true, message: "password validation passed" };
};

module.exports = {
  validateUsername,
  validateEmail,
  validatePassword,
};
