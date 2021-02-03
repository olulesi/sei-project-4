import React from 'react'
import MainNav from './navBars/MainNav'

function Home() {

  return (
    <>
      <MainNav page={'homePage'}/>
      <section className="hero-body">
        <div className="container has-text-centered">
          <h1 className="subtitle">Hey there</h1>
          <h2 className="title">Ashley</h2>
          <h1 className="subtitle profession">A UI/UX Designer</h1>
        </div>

      </section>
    </>
  )
}
export default Home