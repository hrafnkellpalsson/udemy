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
      console.log("Session is valid")
      document.getElementById("username").innerHTML = cognitoUser.getUsername()

      AWS.config.region = "eu-west-1"
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:9ac4d364-0f24-4951-878a-022e624d4aae',
        Logins: {
          'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_py427lKtK': session.getIdToken().getJwtToken()
        },
      })
    } else {
      console.log("Session is invalid")
    }
  })
}

const dynamoClient = new AWS.DynamoDB.DocumentClient()

const params = {
  TableName: 'MVCognito',
  Item: {
    IdentityId: AWS.config.credentials.identityId, // TODO AWS.config.credentials object exists as does the attribute identityId but it's always null!
    LoginCount: 1,
  },
  Expected: {
    IdentityId: {
      Exists: false,
    },
  },
}

dynamoClient.put(params, function(err, data) {
  if (err) {
    if (err.code === 'ConditionalCheckFailedException') {
      console.log('That user already exists')
    } else {
      console.log(error)
    }

    return
  }

  console.log(data)
})
