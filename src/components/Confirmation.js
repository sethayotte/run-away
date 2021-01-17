import React from 'react'
import {Icon} from 'react-icons-kit'
import {ic_check_circle} from 'react-icons-kit/md/ic_check_circle'
import {ic_public} from 'react-icons-kit/md/ic_public'

const Confirmation = () => {
  return (
    <div className='pageContent' id='landing'>
      <section className='landingBody'>
        <Icon className='confirmationIcon' size={70} icon={ic_public} />
        <h1 className='confirmationHeader'>Coming Soon.</h1>
        <p className='inputInstructions'>
          We're working with our parter to bring the ability to book flights
          directly through Run Away.
          <br />
          <br />
          For now, search your suggested destination through{' '}
          <a href='https://flights.google.com' target='_blank'>
            <span id='searchLink'>Google Flights!</span>
          </a>
        </p>
      </section>
    </div>
  )
}

export default Confirmation
