const bookshelf = require("../bookshelf");
bookshelf.plugin("registry");
User = bookshelf.Model.extend({
  tableName: "users"
});
module.exports = bookshelf.model("User", User);
