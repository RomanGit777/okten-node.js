So far we did make it possible for users 
1. to sign up, sign in, get, create, update, delete for all users, and block/unblock for admin
2. We validate requests using middlewares
3. Read/write data to/from DB with flow like: Main>Main API>API router>(middleware)>Controller>Service>Repository>DB

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
      L5,2:

1. create auth.middleware : checkAccessToken : get the token itself, decode userinfo from there, store it in req.res.locals so that authorization logic knows who the user is, without re-verifying the token again.
   (add new method in TokenService : isTokenExists : Promise<boolean> : receive token, decide which db field to 
   check (access/refhresh) query DB, true if found, false otherwise.)

2. remove create for user from user.router + remove create from user.controller
   user.router : add middleware checkAccessToken for put & delete, use signUp to create (auth service)

3. auth controller : add new method : me : return the user that logged in, by id. add new route /me. Think of /me as “load my profile”.

4. auth middleware : new method : checkRefreshToken

5. auth controller : add new method : refresh

6. auth router : new endpoint : refresh

7. validators : auth.validator.ts : validate refresh
   add this to auth router


hw 5: 
1. add to user model new field isActiive true by default, add to interface

2. change in db

3. auth middleware: isAdmin : checks from locals tokenPayload role of the user, error if not

4. user service : isActive : find user by id get his "isActive" field

5. auth middleware : into ckechAccessToken add : after token validation = isActive validation. if return false throw error + forbidden.

6. auth service: after password validation throw new Error if user is not active: if account is not active, block sign in

7. user repository : blockUser, unBlockUser : return findByIdAndUpdate (id, {isActive}, {new:true} : new methods from db

8. user service: blockUser, unBlockUser : return userRepository, pass id

9. user controller : add block&unblock : check if id's not my, return value from service

10. user router : /:id/block&unblock check token, isAdmin, then call controller 
