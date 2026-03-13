So far we did make it possible for users 
1. to sign up, sign in, get, create, update, delete for all users, and block/unblock for admin
2. We validate requests using middlewares
3. Read/write data to/from DB with flow like: Main>Main API>API router>(middleware)>Controller>Service>Repository>DB
4. Get welcome email after sign up 
5. Reset password, log in after verifying account
6. Moved project to docker
7. Integrated frontend
8. Now user can log in, create all pizzas and add new one

створити нуову сутнітсть pizza:

назва
ціна
діаметр

реалізувати вивід на фронтед ці піци, але за умови що користувач залогінений (реалізувати логінацію)

також можете реалізувати реестрацію користувача


hw 8:

1. Interface + model

2. repository, service, controller, pizza router, main router, create postman collection, check responses

3. validator

4. create new react app with typescript
   router.tsx, dir layout MainLayout.tsx, dir pages login,pizzas,register

5. add redux to project
   wrap router in index.tsx,

add dir redux>dir slices, store.ts=
this file sets up Redux store and generates TS types so the rest of app can safely read state and dispatch actions.

add dir hooks, reduxHooks.ts
This file is the typed Redux hooks module

add dir interfaces, authInterface.ts, tokensInterface, userInterface
Interfaces to use TS fully

add dir constants> urls.ts
Creating centralized API route map

add dir types > respType
Axios Response with generic type

add dir service> authService, apiService
apiService: interceptor which takes token from authService and put it into req.headers.Authorization
authService: methods to set/get tokens from LS, to sends login/register requests

add redux>slices > authSlice.ts

6. create loginPage

7. create dir components > pizzasContainer

8. create new slice for pizza
   create pizzaInterface, pizzaService, add slice to store

hw part 2:

1. hide password. change user model

2. authSlice: add me aST
   create header,
   add new interceptor,
   add new refresh method in authService,
   change auth controller refresh method

3. create pizza component

4. apiService add run after refresh logic

5. add pizzaCreate into components,
   in slice add changes for create method
   add changes to pizzas component