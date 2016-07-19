/* globals $ currentUser */
function userAuthSuccess () {
  $('#title').text('About' + currentUser.name)
}
