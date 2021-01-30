import React from 'react'
import { useHistory, Link } from 'react-router-dom'

import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import useForm from '../../utils/useForm'
import useErrorAnimation from '../../utils/useErrorAnimation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

function Login() {

  const { formdata, handleChange } = useForm({ email: '', password: '' })
  const [error, setError] = React.useState(false)
  const { hasErrorAnimationClass, errorAnimation } = useErrorAnimation()
  const history = useHistory()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const { data } = await loginUser(formdata)
      setToken(data.token)
      history.push('/')
    } catch (err) {
      setError(true)
      errorAnimation()
    }
  }

  const handleFocus = () => {
    setError(false)
  }

  return (
    <>
      <section className={`login-form-container ${hasErrorAnimationClass ? 'error-animation' : ''}`}>
        <div className='container-for-login'>
          <h1>Log In</h1>

          <div className='form-box ui form error'>
            <form onSubmit={handleSubmit}>
              <div className='field'>
                <label className='label'>Email</label>
                <div className='control has-icons-left has-icons-right'>
                  <input 
                    onChange={handleChange}
                    name='email'
                    value={formdata.email}
                    onFocus={handleFocus}
                    className={`input ${error ? 'is-danger' : ''}`}
                    type='email' 
                    placeholder='Email'
                  />
                  <span className='icon is-small is-left'>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  {error &&
                    <span className='icon is-small is-right'>
                      <FontAwesomeIcon icon={faExclamationTriangle} className='danger-color'/>
                    </span>
                  }
                </div>
              </div>

              <div className='field'>
                <label className='label'>Password</label>
                <div className='field'>
                  <div className='control has-icons-left has-icons-right'>
                    <input 
                      className={`input ${error ? 'is-danger' : ''}`}
                      type='password' 
                      placeholder='Password'
                      onChange={handleChange}
                      name='password'
                      value={formdata.password}
                      onFocus={handleFocus}
                    />
                    <span className='icon is-small is-left'>
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    {error &&
                      <span className='icon is-small is-right'>
                        <FontAwesomeIcon icon={faExclamationTriangle} className='danger-color'/>
                      </span>
                    }
                  </div>
                </div>
                {error && <p className='help is-danger'>Sorry, your username and/or password is incorrect.</p>}
              </div>
              

              <div className='field'>
                <div className='control'>
                  <button type='submit' className='button is-success'>
                    Log In
                  </button>
                </div>
              </div>
              
              <p className='register-link'>Don&apos;t have an account? Sign up <Link to='/register'>here</Link></p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
