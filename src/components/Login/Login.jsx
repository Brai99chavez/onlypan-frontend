import React from 'react'
import "./Login.css"

export default function Login() {
  return (
      <div className="login">
          <form action="" method="post">
                <h3 className="login-tittle">Login</h3>
              <label>email:</label><br />
              <input type="text" /><br />
              <label >password</label><br />
              <input type="text" /><br />
          </form>
    </div>
  )
}
