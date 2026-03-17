So far we did make it possible for users 
1. to sign up, sign in, get, create, update, delete for all users, and block/unblock for admin
2. We validate requests using middlewares
3. Read/write data to/from DB with flow like: Main>Main API>API router>(middleware)>Controller>Service>Repository>DB
4. Get welcome email after sign up 
5. Reset password, log in after verifying account
6. Moved project to docker
7. Integrated frontend
8. Now user can log in, create all pizzas and add new one
9. Users can upload avatars, and it works with any frontend

L9:

1. create new docker-compose-dev.yml
   change mongouri
   add devDep dotenv in backend

2. npm start in frontend

3. add multer, multer.config.ts

4. add avatar to user model

5. add new route in user router, controller

6. create upload directory

7. add new route in main.ts 
   add changes to user model