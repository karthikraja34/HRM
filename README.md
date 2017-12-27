### hrm-soft
A sample RESTful web service for a Human Resource Management software. 

a [Sails](http://sailsjs.org) application

# Note 
All routes needs authorisation header.To get token you need to login.
login route 
http://localhost:1337/login

Sample login info

username: admin
password: password

# Parameters

The attributes of the model is

* username  -   string 
* password  -   string
* isAdmin   -   boolean // set 'true' to make a user as admin
* isManager -   boolean // set 'false' to make a user as manager

# Routes

* Create

POST ROUTE
http://localhost:1337/signup

_This route needs parameters_


* View
GET ROUTE
http://localhost:1337/view

_This route needs paramaters_

* Update
PUT ROUTE
http://localhost:1337/update

**In this route, it uses username to search for records and used to change fields other than username.**
_This route needs username parameter as must and remaining paramaters are optional in which username cannot be changed_

* Delete
DELETE ROUTE
http://localhost:1337/delete

_This route needs username as parameter_ 

#TO RUN APPLICATION

use 

```
sails lift

to run the application.