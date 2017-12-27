const jwt = require('jsonwebtoken'),
  tokenSecret = process.env.TOKEN_SECRET || "randomstring";



module.exports = {
  issue: function (payload) {
    token = jwt.sign(payload, tokenSecret, {
      expiresIn: 180 * 60
    })
    return token
  },

  verify: function (token, callback) {
    return jwt.verify(token, tokenSecret, callback);
  }
}
