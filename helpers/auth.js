const bcyrpt = require('bcrypt');

const hashedPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcyrpt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcyrpt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return bcyrpt.compare(password, hashed);
};

module.exports = {
  hashedPassword,
  comparePassword,
};
