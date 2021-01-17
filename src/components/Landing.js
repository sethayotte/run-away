import React from 'react'
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
    <div className='pageContent' id='landing'>
      <section className='landingBody'>
        <h1>Ready to get out of town?</h1>
        <Link to='/origin'>
          <button className='buttonMain'>Let's Go</button>
        </Link>
      </section>
    </div>
  )
}

export default Landing
