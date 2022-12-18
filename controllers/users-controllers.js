const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const {validationResult} = require('express-validator');
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users
  try{
    users = await User.find({}, '-password');
  }catch(err){
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    )
    return next(error);
  }
  res.json({users: users});
};

const signup = async(req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(
      new HttpError('Invalid inputs passed, please check data', 422)
    ) 
  }
  const {username, email, password} = req.body;
  let existingUser
  try{
    existingUser = await User.findOne({username: username});
  }catch(err){
    const error = new HttpError(
      'Signing up failed, Please try again later.', 500
    )
    return next(error);
  }
  
  if(existingUser){
    const error = new HttpError(
      'User exists already, please login instead', 422
    )
    return next(error);
  }

  const createdUser = new User({
    username,
    email,
    password,
  })


  try{
    await createdUser.save();
  }catch (err){
    const error = new HttpError(
      'Signing up failed, please try again',
      500
    )
    return next(error);
  }
  res.status(201).json({message: "User created"});
};

const login = async (req, res, next) => {
  const {username, password} = req.body;

  let existingUser
  try{
    existingUser = await User.findOne({username: username});
  }catch(err){
    const error = new HttpError(
      'Logging in failed, Please try again later.', 500
    )
    return next(error);
  }

  if(!existingUser || existingUser.password !== password){
    const error = new HttpError(
      'Invalid credenials, could not log you in.',
      401
    )
    return next(error);
  }

  res.json({message: 'Logged In !!'});

};




exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
