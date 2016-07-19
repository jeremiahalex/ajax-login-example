/* global $ userAuthFailed userAuthSuccess */

/* This file checks if there is a user email and auth_token inside the localstorage, if so it then attempts to load that user from the server. If either fails it will attempt to call a function named userAuthFailed.

If successful it will call a function name userAuthSuccess. It will also assign the user to the a global varaible called currentUser 

NB. should be included after other js files
*/

var serverURL = 'http://localhost:3000/'
var currentUser = null

// If local storage then load user, else call userAuthFailed
if (window.localStorage['email'] && window.localStorage['auth_token']) {
  loadUser()
} else if (typeof (userAuthFailed) === 'function') {
  userAuthFailed()
}

// load the user from the server. This ensures we have a logged in user
function loadUser () {
  $.ajax({
    type: 'GET',
    url: serverURL + 'user',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('User-Email', window.localStorage['email'])
      xhr.setRequestHeader('Auth-Token', window.localStorage['auth_token'])
    },
    success: function (response) {
      // asign the current user
      currentUser = response
      // tell the current page we are ready
      if (typeof (userAuthSuccess) === 'function') userAuthSuccess()
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else error, clear the local storage
      window.localStorage.removeItem('email')
      window.localStorage.removeItem('auth_token')
      // call the userAuthFailed so the page can redirect if it wants
      if (typeof (userAuthFailed) === 'function') userAuthFailed()
    }
  })
}

// when the page is ready, we can add logout/login click handlers
$(function () {
  $('#logout').click(function (event) {
    event.preventDefault()

    // to logout we just clear the localstorage and redirect
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('auth_token')
    window.location.href = 'login.html'
  })
})
