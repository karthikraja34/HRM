// This function retrives token from Authorisation header
const jwt = require('jsonwebtoken');
module.exports = {
  getToken: function (req) {
    if (req.headers && req.headers.authorization) {
      var parts = req.headers.authorization.split(' ');
      if (parts.length == 2) {
        var scheme = parts[0],
          credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        return ResponseService.json(404, res, "Format is Authorization: Bearer [token]");
      }
    } else if (req.param('token')) {
      token = req.param('token');

      delete req.query.token;
    } else {
      return ResponseService.json(404, res, "No authorization header was found");
    }
  }
};
