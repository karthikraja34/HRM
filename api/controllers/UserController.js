/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcryptjs');
module.exports = {
  //This function is user to display all users
  users: (req, res) => {
    User.find()
      .exec(function (err, users) {
        if (err) return res.serverError();
        res.json(users);
      })
  },
  // This function is used to delete a user provided username
  delete: (req, res) => {

    User.destroy({
      username: req.body.username
    }).exec(function (err,users) {
      if (err) {
        return ResponseService.json(404, res, "Operation is not performed", err)
      }

      return ResponseService.json(200, res, "User deleted successfully",users)
    });
  },
  // This function is used to edit user provided username
  update: (req, res) => {
    var password,isAdmin,isManager;
    User.findOne({
      username:req.body.username
    })
      .exec(function (err, users) {
        if (err) return res.serverError();
        password = req.body.password || users.password;
        isAdmin = req.body.isAdmin || users.isAdmin;
        isManager = req.body.isManager || users.isManager;
        
        User.update(

          {
            username: req.body.username
          },
    
          {
            password: password,
            isAdmin: isAdmin,
            isManager: isManager
          }
        ).exec(function (err, users) {
    
          if (err) {
           
            return ResponseService.json(404, res, "User not found", err)
          }
    
          return ResponseService.json(200, res, "User details updated successfully",users)
        });
      });
      
 
  },
  // This function is user to create a new user
  create: (req, res) => {
    var {
      username,
      password,
      isAdmin,
      isManager
    } = req.body;
  
    var isAd = (req.body.isAdmin == 'true');  //This variable is used since sometimes isAdmin parameter maybe of String type.This converts it to boolean.
    var isManag = (req.body.isManager == 'true');//This variable is used since sometimes isManager parameter maybe of String type.This converts it to boolean.
    var isTrue = isAd && isManag;//Checking if a user is both employee and manager
    if (!isTrue === false) {
      return ResponseService.json(400, res, "User cannot be both admin and mmanager")
    } else {
      var data = {
        username: username,
        password: password,
        isAdmin: isAdmin,
        isManager: isManager
      };
      // Creating a new user
      User.create(data).exec(function (err, user) {
        if (err) {
          return ResponseService.json(400, res, "User could not be created", err)
        }
        var responseData = {
          user: user,
          token: JwtService.issue({
            id: user.id
          })
        }
        return ResponseService.json(200, res, "User created successfully", responseData);
      })
    }
  }
};
