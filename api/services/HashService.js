var bcrypt = require('bcryptjs');
module.exports = {
  refreshPassword: function (password) {
    this.password = bcrypt.hashSync(password);
    return this.save();
  }
};
