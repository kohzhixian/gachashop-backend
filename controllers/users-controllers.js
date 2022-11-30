const HttpError = require('../modals/http-error');

const DUMMY_USERS = [
    {
        id: 'u1',
        username: 'kzx',
        password: '123456'
    }
]

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find((u) => {
    return u.id === userId;
  });

  if (!user) {
    return next(new HttpError("Could not find any data for user id", 404));
  }

  res.json({ user });
};

exports.getUserById = getUserById;
