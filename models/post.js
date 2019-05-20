const bookshelf = require("../bookshelf");
bookshelf.plugin("registry");

const Address = bookshelf.Model.extend({
  tableName: "addressBook",
  user: function() {
    return this.belongsTo(userID);
  }
});
module.exports = bookshelf.model("Address", Address);
