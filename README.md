
Lesson 3:

1. src: source file

3. interfaces : user.interface.ts : {
   DB will use model IUser
   IUserDTO we will use to create user
   }

4. models : user.model.ts : проектується на нашу базу данних. We can run db using User. Direct contacnt with DB.

5. repository : user.repository.ts : all db methods (find,getById,create)

6. services : user.service : pass info, and return result

7. .env : port + mongouri

8. config.ts : import of port & mongouri

9. main.js : connection to db

10. routers : api.router : is a main router, define path + who will answer, user.router : using methods from controller

11. controllers : user.controller.ts : methods for router

12. enums : status-codes.enum.ts