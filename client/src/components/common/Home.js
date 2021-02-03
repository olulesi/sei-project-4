import React from 'react'
import { Link } from 'react-router-dom'
import MainNav from './navBars/MainNav'
// import Slider from 'react-slick'
// import homePageCarousel from '../../utils/homePageCarousel'
import { isAuthenticated, getUserId } from '../../lib/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Home() {


  const isLoggedIn = isAuthenticated()
  // const settings = {
  //   infinite: true,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   fade: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // }

  // const carouselImages = homePageCarousel()

  return (
    <>
      
      <section className="hero is-info is-fullheight">
        <div className="hero-head home-page-nav">
          <MainNav page={'homePage'}/>
        </div>
        <div className="hero-body">
          <div className="constanza-container">
            <h1 className="title is-1">Constanza</h1>
            <h6 className="subtitle">Dragging you in the right direction</h6>
            <Link to={`${isLoggedIn ? `/profile/${getUserId()}` : '/login'}`} className="button is-success is-medium">
              <span>Create your Kanban </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </div>
        </div>
      </section>
      {/* <section className="carousel-container">
        <h1>Constanza</h1>
        <h6>Dragging you in the right direction</h6>
        <Slider {...settings}>
          {carouselImages.map(carouselImage => (
            <div className="img-wrapper"key={carouselImage.id}>
              <img className="carousel-images" src={carouselImage.imageUrl}/>
            </div>
          ))}
        </Slider>
      </section> */}
    </>
  )
}
export default Home