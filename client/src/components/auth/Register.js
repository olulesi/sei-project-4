import React from 'react'
import useForm from '../../utils/useForm'
import { registerUser } from '../lib/api'
import { Link, useHistory } from 'react-router-dom'

function Register() {

  const history = useHistory()
  const { formdata, errors, handleChange, setErrors } = useForm({
    username: '',
    full_name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: '',
    avatar: ''
  })

  // console.log(errors)
  // console.log(setErrors)

  const handleSubmit = async event => {
    formdata.username = formdata.email
    event.preventDefault()
    console.log(formdata)
    try {
      console.log(formdata)
      await registerUser(formdata)
      history.push('/login')
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }
  

  return (

    <>
      <section className={`register-form-container ${errors ? 'register-error-form-container ' : ''}`}>
        <h1>Sign Up</h1>
        <div className="form-box ui form error">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Upload Avater</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  type="file" 
                  className="input"
                  name="avatar" 
                  value={formdata.avatar}/>
              </div>
            </div>
            <div className="field">
              <label className="label">Full Name</label>
              <div className="control">
                <input 
                  onChange={handleChange}
                  value={formdata.full_name}
                  className="input"
                  name="full_name" 
                  type="text" 
                  placeholder="Full Name" />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  value={formdata.email} 
                  className="input"
                  name="email" 
                  type="email" 
                  placeholder="Email" />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input 
                  onChange={handleChange}
                  value={formdata.password}
                  name="password"
                  className="input" 
                  type="password" 
                  placeholder="Password" />
              </div>
            </div>

            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  value={formdata.passwordConfirmation}
                  className="input"
                  type="password"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Role</label>
              <div className="control">
                <input
                  className="input"
                  onChange={handleChange}
                  name="role"
                  value={formdata.role}
                  type="text" 
                  placeholder="Student" />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-success">
                  Sign Up
              </button>
            </div>
            <p className="register-link">Already have an account? Login <Link to="/login">here</Link></p>
          </form>
        </div>
      </section>
    </>
  )


}
export default Register
