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

hw11:

1. email.enum: add spam

2. email.constants: add spam

3. templates: add spam.hbs

4. crons: add new spam.cron


Flow:
We're using cron and dayjs dependencies.
Cron starts when the file is imported
Cron runs automatically on its schedule
Logic is defined in remove-old-tokens.ts
Time calculations are done in time.helper.ts