# AJAX Login Example

A jQuery example of signing in a user and persisting their session using local storage. Works in complement to: https://github.com/jeremiahalex/express-api-authentication-example

The main files are: 
* login.js - which logs in a user
* register.js - which allows a user to register
* user_auth.js - which checks if there is a user email and auth_token inside the Local Storage, if so it then attempts to load that user from the server. If either fails it will attempt to call a function named userAuthFailed. Else if successful it will attempt to call a function name userAuthSuccess. Assuming each page in the application then defines these functions it can act accordingly, redirecting if the content should be hidden from non logged in users.