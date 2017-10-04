const signupListener = e => {
  e.preventDefault()

  const email = document.getElementById('email-input').value
  const password = document.getElementById('password-input').value

  // Write email and password to localStorage so we can read from it during the confirmation step rather than
  // explicitly asking for that info again.
  localStorage.setItem("email", email)
  localStorage.setItem("password", password)

  const attributeList = []
  const dataEmail = {
    Name: 'email',
    Value: email,
  }
  attributeList.push(dataEmail)

  userPool.signUp(email, password, attributeList, null, function(err, result) {
    if (err) {
      alert(err)
      return
    }

    const cognitoUser = result.user
    console.log(`user name is ${cognitoUser.getUsername()}`)
  })
}

document.getElementById('signup-submit-button').addEventListener('click', signupListener)
