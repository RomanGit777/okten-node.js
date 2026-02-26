So far we did make it possible for users 
1. to sign up, sign in, get, create, update, delete for all users, and block/unblock for admin
2. We validate requests using middlewares
3. Read/write data to/from DB with flow like: Main>Main API>API router>(middleware)>Controller>Service>Repository>DB
4. Get welcome email after sign up 
5. Reset password, log in after verifying account 

Hw 6:

task 1 flow:
1. change isActive state to false by default
2. create new method for sendEmail (activate)+template
3. add new action tokens
4. add new route for activate methods

task 1:
1. user.model change isActive to false by default
2. constants: change email constants file
   enums : create email.enum file
   update email service + auth service
3. templates : create activate.hbs : (email for activate account)
4. .env : add new tokens & url, add it to config
5. enums: create : token-type.enum
6. enums: action-token-type.enum
7. token.service : change, create new method : generateActionToken
8. enums: add activate method
9. auth.service: change to ACTIVATE, add url + token, generate action token
10. auth controller : add activate method : catch token from params, pass it to the authS.activate.
11. auth.service : add activate method : to verify token we get, get userId from there and pass it to update isActive state in user.
12. auth.router: add new route


task 2 flow:
1. create new reset password endpoint, user sends request to
2. server checks is this email exists in db, if it is, it creates new token, and sends to the email he wrote from
3. client got this email with token, do new request on server with new password in req.body
4. server checks token, if it's valid, validate password, if everything fine, response 201, user
5. User can log in with reseted password

task 2 part 1: send email with link where is token:
1: enums: add recovery, add it to email.constants

2. templates: create recovery.hbs (email we send on request)

3. validators: create recovery validator : to check if email passed and it's a trimmed string

4. user.service: getByEmail : to check if email is in db and return a user

5. auth.controller: add passwordRecoveryRequest : to get the email, pass it to check if user with this email exists after get the user in response, if user is pass him to recoveryPasswordRequest (authservice)

6. auth.service: recoveryPasswordRequest : to generate recovery action token and pass it to the url, also to use sendEmail

task 2 part 2:

1. auth.controller: add recoveryPassword
1. take token from req.params as string
2. take password from body
3. await user from recoveryPassword
4. res ok json user
   try catch

2. auth.service : recoveryPassword
1. token,password, Promise:Iuser
2. verify token = get userid from there
3. hash password
4. return await updateById, change password

3. validators: add to auth.validator : validation for password

4. router: add new router post  recovery/:token, validate by password, move to recovery password 
