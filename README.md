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

hw9:
зробити так щоб користувач міг завантажувати аватарку тільки собі, не вказуючи id в урлі і розвантажити контроллер, використовуючи сервіс

1. delete logs from controller, delete check for user (we already have it in service), move check for req.file to 
   common middleware (create new method isFileExists)

2. change router for upload avatar, move id, add check for token, check for file

3. delete logs from multer, add typing, add Express rd in globals Eslint