import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const sendCredentials = (event) => {
    event.preventDefault()

    const user = {
      username, password
    }
    handleLogin(user)
  }

  return (
    <form onSubmit={sendCredentials}>
      <label htmlFor="username" >Username</label>
      <input 
        id="username" name="username" type="text" value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <label htmlFor="password" >Password</label>
      <input id="password" name="password" type="password" value={password}
            onChange={({ target }) => setPassword(target.value)} />
      <br />
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm