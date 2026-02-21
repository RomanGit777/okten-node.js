L4:
1. Errors: api.error : ApiError exists so middleware can throw errors that already know which HTTP status they belong to
2. in main.ts add : error handling
3. middleware: Middleware protects your controllers from bad input and bad states.
4. user.validator : validate the requests
5. to user router add middleware, to validate the request, if it's validated, move on, if not, move on error handler
