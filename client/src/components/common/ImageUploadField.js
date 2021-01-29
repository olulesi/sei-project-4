/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

function ImageUploadField({ onChange, value, name, labelText = 'Upload Image' }) {

  const [uploadFieldFile, setUploadFieldFile] = React.useState(null)

  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    onChange({ target: { name, value: res.data.url } })
    setUploadFieldFile(event.target.files[0])
  }

  return (
    <>
      <label className='label'>{labelText}</label>
      <div className='file has-name'>
        <label className='file-label' style={{ width: '100%' }}>
          <input
            type='file' 
            onChange={handleUpload}
            className='file-input'
            name={name}
          />
          <span className='file-cta' style={{ paddingRight: '6px' }}>
            <span className='file-icon'>
              <FontAwesomeIcon icon={faUpload} />
            </span>
          </span>
          {uploadFieldFile ?
            <span className='file-name' style={{ width: '100%' }}>
              {uploadFieldFile.name}
            </span>
            :
            <span className='file-name' style={{ width: '100%' }}>
              No file uploaded...
            </span>
          }
        </label>
      </div>
    </>
  )
}

export default ImageUploadField
