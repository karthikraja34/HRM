/**
 * isAdminOrManager
 *
 * @description :: Policy to check if user is either Admin or Manager
 */

const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  GetToken.getToken(req);
  // This function decodes token
  var decoded = jwt.decode(token, {
    complete: true
  });
  var userid = decoded.payload.id;
//   It checks if the found user id is admin or manager
  User.findOne({
    id: userid
  }).exec(function (err, user) {
    if (err) {
      return res.serverError(err);
    }
    if (!user) {
      return res.notFound('Only Admin or Manager can Perform this function');
    }


    if (user.isAdmin || user.isManager) {
      return next();
    } else {
      return ResponseService.json(401, res, "Only Admin or Manager can Perform this function");
    }
  });

}
