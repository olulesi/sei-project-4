import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import useForm from '../../utils/useForm'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'

function Login() {

  const history = useHistory()
  const [error, setError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const { data } = await loginUser(formdata)
      setToken(data.token)
      history.push('/')
    } catch (err) {
      setError(true)
    }
  }

  const handleFocus = () => {
    setError(false)
  }

  return (

    <>
      <section className="login-form-container">
        <div className="container-for-login">
          <h1>Log In</h1>

          <div className="form-box ui form error">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input 
                    onChange={handleChange}
                    name="email"
                    value={formdata.email}
                    onFocus={handleFocus}
                    className="input" 
                    type="email" 
                    placeholder="Email" />
                </div>
          
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="field">
                  <div className="control">
                    <input 
                      className="input" 
                      type="password" 
                      placeholder="Password"
                      onChange={handleChange}
                      name="password"
                      value={formdata.password}
                      onFocus={handleFocus} />
                  </div>
                </div>
              </div>

              {error && <p className="help is-danger">Sorry, your username or password are incorrect.</p>
              }

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Log In
                  </button>
                </div>
              </div>
            </form>
           
            <p className="register-link">Dont have an account? Sign up <Link to="/register">here</Link></p>
          </div>
        </div>
      </section>
    </>
  )


}
export default Login