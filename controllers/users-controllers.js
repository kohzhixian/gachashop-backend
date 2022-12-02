const HttpError = require("../modals/http-error");
const { v4: uuid } = require("uuid");

let DUMMY_USERS = [
  {
    id: "uniqueId",
    uid: "u1",
    username: "kzx",
    password: "123456",
  },
];

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find((u) => {
    return u.uid === userId;
  });

  if (!user) {
    return next(new HttpError("Could not find any data for user id", 404));
  }

  res.json({ user });
};

const createUser = (req, res, next) => {
  const { uid, username, password } = req.body;
  const createdUser = {
    id: uuid(),
    uid,
    username,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const updateUser = (req, res, next) => {
  const { username, password } = req.body;
  const userId = req.params.uid;

  const updatedUser = { ...DUMMY_USERS.find(u => u.uid === userId)};
  const userIndex = DUMMY_USERS.findIndex(u => u.uid === userId);

  updatedUser.username = username;
  updatedUser.password = password;

  DUMMY_USERS[userIndex] = updatedUser;

  res.status(200).json({user: updatedUser});

};

const deleteUser = (req, res, next) => {
  const userId = req.params.uid;
  DUMMY_USERS = DUMMY_USERS.filter(u => u.uid !== userId);

  res.status(200).json({message: "DELETED USER !!!"});
}


exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;