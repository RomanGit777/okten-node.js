Lesson 2:

1: db/users.json : File-based database (JSON used as persistent storage).

2: services/fs.service.js : Read: data from db, parse and return it. Write: data it gets from users argument into db. (Direct worker with the dataBase)

3: repositories/user.repository.js  getAll: get array of parsed data or empty array from Read from service.js. Create:
get result of Read, build new user, push it to the array returned from Read, then Write the result into database, return
 created User, getById: read db, compare ids, return founded user

4: services/user.service.js : getAll(): Delegates data access to the repository and returns the result. create: Calls
repository to create a user and returns the created entity, getById: pass the id, get founded user

5: main.js : Post: take user client created, send it to the service, await, get created user back to client.  Get: get
array of users or [], getById: get the id from params, pass it to service, wait for response