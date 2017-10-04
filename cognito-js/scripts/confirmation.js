const confirmationListener = e => {
  e.preventDefault()

  // Since we now store email in local storage after sign up we don't need to explicitly ask for it again
  // const email = document.getElementById('confirmation-email-input').value
  const email = localStorage.getItem("email")
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

    // Now that user has been successfully confirmed, sign the user in.
    const authenticationData = {
      Username: localStorage.getItem("email"),
      Password: localStorage.getItem("password"),
    }
    localStorage.clear()
    const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.log(`acccess token: ${result.getAccessToken().getJwtToken()}`)
      },
      onFailure: function(err) {
        alert(err)
      },
    })

    console.log(`call result: ${result}`)
  })
}

document.getElementById('confirmation-submit-button').addEventListener('click', confirmationListener)
