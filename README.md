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
10. Frontend can get paginated lists of user, inc. totalPages, page, prev, next, and can be sorted desc,asc
11. Pizzas can be found by diameter,price,name, response also contains pagination logic
12. We can send spam messages to everybody who's registered in our application
13. Developers can check swagger documentation to see how (requests, responses) work

L12:

1. install dependencies: swagger-ui-express, devDep: types/swagger-ui-express, openapi-types.

2. configs : create swagger.config.ts

3. main.ts : add swagger to main.ts


Flow:
We're install swagger & openapi dependencies
Write swagger document
Connect it to the express in main.ts