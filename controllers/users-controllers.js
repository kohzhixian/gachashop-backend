const HttpError = require("../modals/http-error");
const { v4: uuid } = require("uuid");
const {validationResult} = require('express-validator');

let DUMMY_USERS = [
  {
    id: "u1",
    username: "kzx",
    email: "test@gmail.com",
    password: "123456",
  },
];

const getUsers = (req, res, next) => {
  res.json({users: DUMMY_USERS});
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    throw new HttpError('Invalid inputs passed, please check data', 422);
  }
  const {username, email, password} = req.body;

  const hasUser = DUMMY_USERS.find(u => u.username === username);

  if(hasUser){
    throw new HttpError('User already exists!!');
  }

  const createdUser = {
    id: uuid(),
    username,
    email,
    password
  }

  DUMMY_USERS.push(createdUser);
  res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
  const {username, password} = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.username === username);

  if(!identifiedUser || identifiedUser.password !== password){
    throw new HttpError("Could not identify user, credential seems to be wrong!");
  };

  res.json({message: 'Logged In !!'});

};




exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
