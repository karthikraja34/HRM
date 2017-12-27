module.exports = {

  login: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    verifyParams(res, username, password)

    User.findOne({
      username: username
    }).then(function (user) {
      if (!user) {
        return invalidEmailOrPassword(res);
      }
      signInUser(req, res, password, user)
    }).catch(function (err) {
      return invalidEmailOrPassword(res);
    });
  }

};


function signInUser(req, res, password, user) {
  User.comparePassword(password, user).then(
    function (valid) {
      if (!valid) {
        return this.invalidEmailOrPassword();
      } else {
        var responseData = {
          user: user,
          token: generateToken(user.id)
        }
        return ResponseService.json(200, res, "Successfully signed in", responseData)
      }
    }
  ).catch(function (err) {
    return ResponseService.json(403, res, "Forbidden")
  })
};


function invalidEmailOrPassword(res) {
  return ResponseService.json(401, res, "Invalid username or password")
};

function verifyParams(res, username, password) {
  if (!username || !password) {
    return ResponseService.json(401, res, "Email and password required")
  }
};


function generateToken(user_id) {
  return JwtService.issue({
    id: user_id
  })
};
