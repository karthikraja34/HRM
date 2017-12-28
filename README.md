# hrm-soft
A sample RESTful web service for a Human Resource Management software. 

a [Sails](http://sailsjs.org) application

## Web Service Requirements
The human resource management software allows a HR manager to manage a list of employees within their company. The software allows for the following roles, each with different levels of permissions:

1. Administrators - They are the root level users in the system and have access to do everything. Only administrators can create managers.
2. Managers - Managers can only view / edit / delete employees.
3. Employees - Employees are records in the database and do not have the power to do anything.

* Create an API to allow an administrator to create a manager
* Create 3 APIs to allow managers & administrators to view / edit / delete employees

**Remember:** Administrators can perform all the functions of the manager but managers cannot perform the function of the administrator (create new managers).


## Note 
**For demo purposes this application uses mlab mongoDb**
All routes needs authorisation header.To get token you need to login.
login route 
http://localhost:1337/login

Sample login info

```
**Admin**
username: admin
password: password

**Manager**
username: manager
password: password

```
## Parameters

The attributes of the model is

* username  -   string (must be unique)
* password  -   string (min 6 characters)
* isAdmin   -   boolean // ( default : false | set 'true' to make a user as admin)
* isManager -   boolean // ( default : false | set 'false' to make a user as manager)

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

## TO RUN APPLICATION

use 

```
sails lift
```
to run the application.