import React from 'react'
import { Link } from 'react-router-dom'
import MainNav from './navBars/MainNav'
import { isAuthenticated, getUserId } from '../../lib/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faListUl, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import Tilt from 'react-parallax-tilt'
//faColumns


function Home() {


  const isLoggedIn = isAuthenticated()

  return (
    <>
      <section className="hero is-fullheight">
        <div className="hero-head home-page-nav">
          <MainNav page={'homePage'}/>
        </div>
        <div className="homePage-container">
          <div className="curved-banner-container">
            <div className="constanza-container">
              <div>
                <h1 className="title is-1">Costanza</h1>
                <h6 className="subtitle">Dragging you in the right direction</h6>
                <Link to={`${isLoggedIn ? `/profile/${getUserId()}` : '/login'}`} className="button is-success is-medium">
                  <span>Create your Kanban </span>
                </Link>
              </div>
            </div>
            <div className="costanzaVideo-container">
            </div>
          </div>
          {/* <div className="wave-wrapper">
            <svg viewBox="45 20 1390 190">
              <defs className="svg-background">
              </defs>
              <path fill="url(#gradient)" fillOpacity="1" d="M0, 0L40, 26.7C80, 53, 160, 107, 240, 149.3C320, 192, 400, 224, 480, 202.7C560, 181, 640, 107, 720, 80C800, 53, 880, 75, 960, 74.7C1040, 75, 1120, 53, 1200, 53.3C1280, 53, 1360, 75, 1400, 85.3L1440, 96L1440, 0L1400, 0C1360, 0, 1280, 0, 1200, 0C1120, 0, 1040, 0, 960, 0C880, 0, 800, 0, 720, 0C640, 0, 560, 0, 480, 0C400, 0, 320, 0, 240, 0C160, 0, 80, 0, 40, 0L0, 0Z"></path>
            </svg>
          </div> */}
         
          <div className="features-container">
            <div className="features-content">
              <Tilt>
                <div className="costanza-feature">
                  <div className="costanza-feature-content">
                    <div className="feature-icon is-large">
                      <FontAwesomeIcon className="icons" icon={faListUl} />
                    </div>
                    <div className="feature-text">Create you own columns and tickets as you plan your project on our Costanza Kanban. Interact with them with a smooth drag and drop.</div>
                  </div>
                </div>
              </Tilt>
              <Tilt>
                <div className="costanza-feature">
                  <div className="costanza-feature-content">
                    <div className="feature-icon is-large">
                      <FontAwesomeIcon className=" icons has-text-info" icon={faUsers} />
                    </div>
                    <div className="feature-text">Add Members to your workspace and collaborate on projects together. Assign members specific tickets as well as adding comments.</div>
                  </div>
                </div>
              </Tilt>
              <Tilt>
                <div className="costanza-feature">
                  <div className="costanza-feature-content">
                    <div className="feature-icon is-large">
                      <FontAwesomeIcon className="icons has-text-success" icon={faCheckSquare} />
                    </div>
                    <div className="feature-text">Create your own todo list within each column ticket. Apply deadlines to stay on top of each of the tickets you create to stay productive.</div>
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Home