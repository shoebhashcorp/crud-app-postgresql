const bookshelf = require("../bookshelf");
bookshelf.plugin("registry");
const User = bookshelf.Model.extend({
  tableName: "users",
  address: function() {
    return this.hasMany("Address", "userID", "id");
  }
});

module.exports = bookshelf.model("User", User);
