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
10. Frontend can get paginated lists of user, inc. totalPages, page, prev, next

L10:
1. user.interface: add IUserQuery (pageSize: n, page: n, search?: s, order?: s)

2. enums: create user-query-order.enum

3. user.validator: add new method query

4. common middleware: add new method query,
   add it to getAll (user.router) to validate query

5. create IPaginatedResponse<T>

6. user.repository, service, controller: add changes to getAll method 

Flow:
Server get request. It validates query's using commonMiddleware, then call controller.
controller takes query's and pass it to the service,
service takes query's and pass it to repository,
repository works with query's, match, sort, group data and return it to service,
service takes array with data and extract from there data into 
variables (data, totalItems), calculate total pages, make logic for buttons, return everything to the controller, 
controller takes it parse it to json and give response to frontend