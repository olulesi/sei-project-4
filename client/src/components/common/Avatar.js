import React from 'react'

import { initialize } from '../auth/Register'

function Avatar({ size, avatar, fullName, hasTooltip = false, style }) {
  return (
    <>
      {hasTooltip ?
        <div
          className='has-tooltip-bottom has-tooltip-arrow'
          data-tooltip={fullName}
          style={style}
        >
          <div className={`avatar-container ${size}`}>
            {avatar ?
              <img src={avatar} className='avatar'/>
              :
              <p className='initials'>
                {initialize(fullName)}
              </p>
            }
          </div>
        </div>
        :
        <div className={`avatar-container ${size}`} style={style}>
          {avatar ?
            <img src={avatar} className='avatar'/>
            :
            <p className='initials'>
              {initialize(fullName)}
            </p>
          }
        </div>
      }
    </>
  )
}

export default Avatar