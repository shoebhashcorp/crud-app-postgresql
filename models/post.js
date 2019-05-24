const bookshelf = require("../bookshelf");
bookshelf.plugin("registry");

const Address = bookshelf.Model.extend({
  tableName: "addressBook",
  user: function() {
    return this.belongsTo("User", "id ");
  }
});
module.exports = bookshelf.model("Address", Address);
