
Lesson 3:
1. install dependencies, devdependencies, scripts, tsconfig
2. src: source file. create. 

3. interfaces : user.interface.ts : {
    IUser : represents DB document, response
   IUserDTO : create, update, delete
   } 

4. models : user.model.ts : Defines the structure of user data in the database and creates a model to read/write users from MongoDB.

5. repositories : user.repository.ts : all db methods (find,getById,create), talks directly to the DB

6. services : user.service : pass info, and return result. It contains the business logic and connects controllers with repositories.
   It decides what should happen, while the repository only knows how to talk to the database.
Controller → handles HTTP
Service → handles logic / rules
Repository → handles DB

7. routers : api.router : is a main router, define path + who will answer, user.router : using methods from controller

8. controllers : user.controller.ts : methods for router
9. enums : status-codes.enum.ts

10. env : port + mongouri  
11. config.ts : import of port & mongouri

12. main.ts : connection to db