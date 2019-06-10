const jwt = require("jsonwebtoken");
const nanoid = require("nanoid");

const returnAuthPayload = require("./userUtils");

exports.google = (req, res) => {
  const io = req.app.get("io");
  const user = {
    name: req.user.displayName,
    photo: req.user.photos[0].value.replace(/sz=50/gi, "sz=250"),
    email: req.user.emails[0].value
  };
  console.log("user", req.user);

  createOrAuthenticateUser(req, user, "google");
};

exports.github = (req, res) => {
  // console.log(req.user);
  const io = req.app.get("io");
  //some users do not show email addresses in github profile
  const user = {
    name: req.user.displayName,
    photo: req.user.photos[0].value,
    email: req.user.emails[0].value
  };
  createOrAuthenticateUser(req, user, "github");
};

function createOrAuthenticateUser(req, socketUser, socketName) {
  // find the user using email address
  // else create the user
  // get JWT and send JWT

  const io = req.app.get("io");
  let errors = {};

  User.where({ email: socketUser.email })
    .then(user => {
      // check for user
      if (!user) {
        // @TODO: create user
        createSocketUser(req, socketUser, socketName);
      } else {
        // update user save email verification true
        user.accountactivated = "yes";
        user.emailverified = "yes";
        user.save();
        //User matched Create JWT Payload
        let payload = returnAuthPayload.returnAuthPayload(user);
        jwt.sign(
          payload,
          process.env.SECRET_OR_KEY,
          { expiresIn: process.env.TOKEN_EXPIRY_TIME },
          (err, token) => {
            io.in(req.session.socketId).emit(socketName, {
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
    })
    .catch(err => {
      console.log("error at socket user login", err);
      // console.log(err);
      // return res.status(400).json("Error occured!");
    });
}

function createSocketUser(req, socketUser, socketName) {
  let password = nanoid(48);
  let userName = socketUser.name.split(" ");
  const newUser = new User({
    firstname: encodeURIComponent(userName[0]),
    lastname: encodeURIComponent(userName[1] ? userName[1] : ""),
    email: socketUser.email,
    password_digest: password
  });
  // console.log(newUser);

  newUser
    .save()
    .then(user => {
      createOrAuthenticateUser(req, socketUser, socketName);
    })
    .catch(err => console.log(err));
}
