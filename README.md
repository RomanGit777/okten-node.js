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

Hw10:

Flow:
Server get request, call controller.
controller takes query's and pass it to the service,
service takes query's and pass it to repository,
repository works with query's, add limit,skip,sort return it to the service,
service takes array with data and extract from there data, calculate total pages, make logic for buttons, return 
everything to the controller, 
controller takes it parse to json and give response to frontend