var request = require("request");

const returnAuthPayload = user => {
  return {
    id: user.id,
    username: user.username,
    email: user.email
  };
};

module.exports = returnAuthPayload;
