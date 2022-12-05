const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require("../models/user");


// @desc Register A New User
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Include All Fields");
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Login A User
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //Check user and password if match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error("Bad User Credentials");
  }
});


// @desc Get Current User
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req,res)=> {
   const user =  {
    id : req.user._id,
    email: req.user.email,
    name: req.user.name,

   } 
   res.status(200).json(user)
})

//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, 'ABC', {
        expiresIn: '30d',
    })
}

module.exports = {
  registerUser,
  loginUser,
  getMe
};
