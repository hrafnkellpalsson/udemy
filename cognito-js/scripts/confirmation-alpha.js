// Just confirmation, not signing in as well.

const confirmationAlphaListener = e => {
  e.preventDefault()

  const email = document.getElementById('confirmation-email-input').value
  const confirmationCode = document.getElementById('confirmation-code-input').value

  const userData = {
    Username: email,
    Pool: userPool,
  }

  // Recreating cognito user, could have shared user created in sign up rather than create a new one.
  // That way we wouldn't have had to reprompt for an email.
  // Will see that flow later.
  const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData)

  cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
    if (err) {
      alert(err)
      return
    }

    console.log(`call result: ${result}`)
  })
}

document.getElementById('confirmation-submit-button').addEventListener('click', confirmationAlphaListener)
