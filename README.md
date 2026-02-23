L5:
1. Preparing user model for authentication + authorization{
    1. dependencies : bcrypt, jsonwebtoken + types for them in package.json. 

    2. add email, password, role, isDeleted, isVerified to userSchema. Because from now user will have opportunity to 
   log in and sign up

    3. create a role.enums.ts. That we can define who's logged in/signed up and what he can do 

   4. change interface: 1.separate updatedAt, createdAt => IBase 2.extend IUser from IBase, add new lines from model,
      3.extend IUserCreatDTO+Update, hold them separate
}

2. Authentication infrastructure{
   1. create token interface

   2. create token model

   3. password service : get and hash password, compare password with existing hash.

   4. env: add secrets : access,refresh,lifetime for both.
   
   5. token service : class TokenService: generate tokens, verify tokens + decode user data from it

   6. config : add new secrets from .env to export it to TokenService + create a interface for it.
}
3. Authentication & user flow implementation{
   1. user.repository : add getByEmail

   2. user.service : check is email unique? add if to check user existence

   3. create token repository : create, findByParams

   4. create auth service : login, sign in

   5. create auth.controller : get result of auth service, return it

   6. create auth.router :  validate data, call controller
       (create regexp enum for password,name, add it to validator)

   7. api.router : add auth route
   
   8. connect to db

   9. create postman collection + base url
}