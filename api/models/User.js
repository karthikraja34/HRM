/**
 * User.js
 *
 * @description :: This is a user model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
module.exports = {
  collection: 'user',
  attributes: {
    username:{
      type: "string",
      required: true,
      unique: true
    },
    password:{
      type:"string",
      minLength: 6,
      protected: true,
      required: true,
    },
    isManager:{
      type:'boolean',
      defaultsTo: false
    },
    isAdmin:{
      type:'boolean',
      defaultsTo: false
    },
   
  },
  // This function creates hashfunction for password when it is created
  beforeCreate: function(values, cb){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return cb(err);
        values.password = hash;
        cb();
      });
  });
},
// This function is used compares plain password with hashed password in database
comparePassword: function(password, user) {
  return new Promise(function (resolve, reject) {
bcrypt.compare(password, user.password, function (err, match) {
  if (err) reject(err);

  if (match) {
    resolve(true);
  } else {
    reject(err);
  }
})
});
},
// This function creates hashfunction for password when it is updated
beforeUpdate: function (values, next) {
  if (values.id) {
      if (values.password) {
          return User.findOne({id: values.id})
          .then(function (user) {
              if (values.password !== user.password) {
                  values.password = bcrypt.hashSync(values.password);
              }               
              next();
          })
          .catch(next);
      }
  } else if (values.password) {
      values.password = bcrypt.hashSync(values.password);
  }

  next();
},
  connection:'mongodb'
};

