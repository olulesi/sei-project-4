import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import ImageUploadField from '../common/ImageUploadField'
import { registerUser } from '../../lib/api'
import useForm from '../../utils/useForm'
import unpackErrors from '../../utils/unpackErrors'
import useErrorAnimation from '../../utils/useErrorAnimation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock, faExclamationTriangle, faCheck } from '@fortawesome/free-solid-svg-icons'

const initialize = string => {
  if (!string) return
  return string.trim().split(/ +/).map(item => item[0].toUpperCase()).join('')
}

const genericErrorMessage = 'This field may not be blank.'

function Register() {

  const { formdata, errors, setErrors, handleChange } = useForm({
    username: '',
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: '',
    avatar: ''
  })
  const { hasErrorAnimationClass, errorAnimation } = useErrorAnimation()
  const history = useHistory()

  const handleSubmit = async event => {
    formdata.username = formdata.email
    event.preventDefault()
    try {
      console.log(formdata)
      await registerUser(formdata)
      history.push('/login/')
    } catch (err) {
      console.log(event.target.parentNode)
      setErrors(unpackErrors(err.response.data))
      errorAnimation()
    }
  }

  const passwordConfirmationIsValid = formdata.password === formdata.passwordConfirmation &&
    formdata.password.length >= 8 && !errors.password
  
  return (
    <>
      <section className={`register-form-container ${hasErrorAnimationClass ? 'error-animation' : ''}`}>
        <h1>Sign Up</h1>
        <div className='form-box ui form error'>
          <form onSubmit={handleSubmit}>
            <div className='field avatar-field'>
              <div className='avatar-container'>
                {formdata.avatar ?
                  <img src={formdata.avatar} className='avatar' />
                  :
                  <p className='initials'>
                    {initialize(formdata.fullName)}
                  </p>
                }
              </div>
            </div>

            <div className='field'>
              <ImageUploadField
                onChange={handleChange}
                value={formdata.avatar}
                name='avatar'
                labelText='Avatar'
              />
            </div>

            <div className='field'>
              <label className='label'>Full Name</label>
              <div className='control has-icons-left has-icons-right'>
                <input 
                  onChange={handleChange}
                  value={formdata.fullName}
                  className={`input ${errors.fullName ? 'is-danger' : ''}`}
                  name='fullName' 
                  type='text' 
                  placeholder='Full Name'
                />
                <span className='icon is-small is-left'>
                  <FontAwesomeIcon icon={faUser} />
                </span>
                {errors.fullName &&
                  <span className='icon is-small is-right'>
                    <FontAwesomeIcon icon={faExclamationTriangle} className='danger-color'/>
                  </span>
                }
              </div>
              {errors.fullName && <p className='help is-danger'>Full Name is Required</p>}
            </div>

            <div className='field'>
              <label className='label'>Email</label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  onChange={handleChange}
                  value={formdata.email} 
                  className={`input ${errors.email ? 'is-danger' : ''}`}
                  name='email' 
                  type='email' 
                  placeholder='Email'
                />
                <span className='icon is-small is-left'>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                {errors.email &&
                  <span className='icon is-small is-right'>
                    <FontAwesomeIcon icon={faExclamationTriangle} className='danger-color'/>
                  </span>
                }
              </div>
              {errors.email && <p className='help is-danger'>Email is Required</p>}
            </div>

            <div className='field'>
              <label className='label'>Password</label>
              <div className='control has-icons-left has-icons-right'>
                <input 
                  onChange={handleChange}
                  value={formdata.password}
                  name='password'
                  className={`input ${errors.password ? 'is-danger' : ''}`}
                  type='password' 
                  placeholder='Password'
                />
                <span className='icon is-small is-left'>
                  <FontAwesomeIcon icon={faLock} />
                </span>
                {errors.password &&
                  <span className='icon is-small is-right'>
                    <FontAwesomeIcon icon={faExclamationTriangle} className='danger-color'/>
                  </span>
                }
              </div>
              {errors.password &&
                <p className='help is-danger'>
                  {errors.password === genericErrorMessage ?
                    'Password is Required'
                    :
                    errors.password
                  }
                </p>
              }
            </div>

            <div className='field'>
              <label className='label'>Password Confirmation</label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  onChange={handleChange}
                  value={formdata.passwordConfirmation}
                  className={`input 
                    ${errors.passwordConfirmation ? 'is-danger' : ''} 
                    ${passwordConfirmationIsValid ? 'is-success' : ''}`
                  }
                  type='password'
                  placeholder='Password Confirmation'
                  name='passwordConfirmation'
                />
                <span className='icon is-small is-left'>
                  <FontAwesomeIcon icon={faLock} />
                </span>
                {errors.passwordConfirmation &&
                  <span className='icon is-small is-right'>
                    <FontAwesomeIcon icon={faExclamationTriangle} className='danger-color'/>
                  </span>
                }
                {passwordConfirmationIsValid &&
                  <span className='icon is-small is-right'>
                    <FontAwesomeIcon icon={faCheck} className='success-color'/>
                  </span>
                }
              </div>
              {errors.passwordConfirmation &&
                <p className='help is-danger'>
                  {errors.passwordConfirmation === genericErrorMessage ?
                    'Password Confirmation is Required'
                    :
                    errors.passwordConfirmation
                  }
                </p>
              }
            </div>

            <div className='field'>
              <button type='submit' className='button is-success'>
                  Sign Up
              </button>
            </div>

            <p className='register-link'>Already have an account? Login <Link to='/login'>here</Link></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register
