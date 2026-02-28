So far we did make it possible for users 
1. to sign up, sign in, get, create, update, delete for all users, and block/unblock for admin
2. We validate requests using middlewares
3. Read/write data to/from DB with flow like: Main>Main API>API router>(middleware)>Controller>Service>Repository>DB
4. Get welcome email after sign up 
5. Reset password, log in after verifying account
6. Did move project to docker


This gives us frontend+backend working in one url together
L8:

1. create frontend directory, create react app in there

2. create client directory

3. add web to docker-compose.yml

3. create nginx.conf

4. frontend, app: fetch users (useState + useFetch)

5. make npm build in frontend directory
   delete created build file, add file .env
   add BUILD_PATH='../client' and rebuild again

6. docker rebuild main path

7. add watch dependencies