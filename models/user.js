// const bookshelf = require("../bookshelf");

// module.exports = User = bookshelf.Model.extend({
//   tableName: "users",
//   posts: function() {
//     return this.hasMany(Posts);
//   }
// });

// module.exports = Posts = bookshelf.Model.extend({
//   tableName: "contactbook"
// });

const bookshelf = require("../bookshelf");
bookshelf.plugin("registry");
const User = bookshelf.Model.extend({
  tableName: "users",
  address: function() {
    return this.hasMany("Address", "userID", "id");
  }
});

module.exports = bookshelf.model("User", User);
