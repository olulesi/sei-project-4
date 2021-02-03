import React from 'react'
import { useHistory } from 'react-router-dom'

import useForm from '../../utils/useForm'
import unpackErrors from '../../utils/unpackErrors'
import { getUserProfile, editUserProfile } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import useErrorAnimation from '../../utils/useErrorAnimation'
import MainNav from '../common/navBars/MainNav'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const initialize = string => {
  if (!string) return
  return string.trim().split(/ +/).map(item => item[0].toUpperCase()).join('')
}

const genericErrorMessage = 'This field may not be blank.'

function EditProfile() {

  const history = useHistory()
  const { formdata, errors, handleChange, setFormdata, setErrors } = useForm({
    username: '',
    fullName: '',
    email: '',
    role: '',
    avatar: ''
  })

  const { hasErrorAnimationClass, errorAnimation } = useErrorAnimation()

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getUserProfile()
      setFormdata(data)
    }
    getData()
  }, [setFormdata])

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const newProfile = { ...formdata }
      console.log(newProfile)
      await editUserProfile(newProfile)
      history.push(`/profile/${getUserId()}`)
    } catch (err) {
      setErrors(unpackErrors(err.response.data))
      errorAnimation()
    }
  }

  return (
    <>
      <MainNav page={'editProfile'}/>
      <section className={`register-form-container ${hasErrorAnimationClass ? 'error-animation' : ''}`}>
        <h1>Edit Profile</h1>
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

            {/* <div className='field'>
              <ImageUploadField
                onChange={handleChange}
                value={formdata.avatar}
                name='avatar'
                labelText='Avatar'
              />
            </div> */}

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
                    <FontAwesomeIcon icon={faExclamationTriangle} className='danger-color' />
                  </span>
                }
              </div>
              {errors.fullName &&
                <p className='help is-danger'>
                  {errors.fullName === genericErrorMessage ?
                    'Full Name is Required'
                    :
                    errors.fullName
                  }
                </p>
              }
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
                    <FontAwesomeIcon icon={faExclamationTriangle} className='danger-color' />
                  </span>
                }
              </div>
              {errors.email &&
                <p className='help is-danger'>
                  {errors.email === genericErrorMessage ?
                    'Email is Required'
                    :
                    errors.email
                  }
                </p>
              }
            </div>

            <div className='field'>
              <button type='submit' className='button is-success'>
                Done
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )

}

export default EditProfile
