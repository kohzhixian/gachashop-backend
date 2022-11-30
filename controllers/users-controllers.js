const HttpError = require('../modals/http-error');
const {v4: uuid} = require('uuid');

const DUMMY_USERS = [
    {
        id: 'uniqueId',
        uid: 'u1',
        username: 'kzx',
        password: '123456',
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
    const {uid, username, password} = req.body;
    const createdUser = {
        id: uuid(),
        uid,
        username,
        password
    }

    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});
};

exports.getUserById = getUserById;
exports.createUser = createUser;
