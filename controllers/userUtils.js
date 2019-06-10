var request = require("request");

const returnAuthPayload = user => {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email
  };
};

// function updateGravatar(user) {
//   let processGravatar = false;
//   if (!user.gravatar || !user.gravatarfetched) {
//     processGravatar = true;
//   } else if (user.gravatar === "" && user.gravatarfetched === "no") {
//     processGravatar = true;
//   }
//   if (processGravatar) {
//     console.log("Gravatar Processing...");
//     let userGravatar = gravatar.url(user.email, {
//       protocol: "https",
//       d: "404"
//     });
//     try {
//       request(userGravatar, function(err, response, body) {
//         if (response && response.statusCode === 200) {
//           user.gravatar = userGravatar;
//           user.gravatarfetched = "yes";
//           user.save();
//         }
//       });
//     } catch (error) {
//       console.log("try catch error", error);
//     }
//   }
// }

module.exports = returnAuthPayload;
