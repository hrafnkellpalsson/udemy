// Restoring a session
window.onload = function() {
  // Uses 'LastAuthUser' from localStorage
  const cognitoUser = userPool.getCurrentUser()

  if (cognitoUser === null) return

  // getSession() automatically reads the local storage jwt tokens so we don't have to manually pass them in
  cognitoUser.getSession(function(err, session) {
    if (err) {
      alert(err)
      return
    }

    if (session.isValid()) {
      document.getElementById("username").innerHTML = cognitoUser.getUsername()
    } else {
      console.log("Session is invalid")
    }
  })
}
