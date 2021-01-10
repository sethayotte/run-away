import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import TicketHorizontal from './TicketHorizontal';
import TicketVertical from './TicketVertical';
import BookingData from './BookingData';

function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

const Booking = () => {

    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
      })
    
      useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setDimensions({
              height: window.innerHeight,
              width: window.innerWidth
            })
          }, 500)
          window.addEventListener('resize', debouncedHandleResize)
      });

    return (
        <div className="pageContent" id="booking">
            <h1>Pack your bags.</h1>
            {(dimensions.width < 1150) ? (
                <TicketVertical />
            ) : (
                <div className="ticketRender">
                    <div className="container">
                        <TicketHorizontal />
                    </div>
                </div>
            )}
            <div className="data">
                <div className="dataChild">
                    <BookingData />
                </div>
            </div>
            <div className="bookingControls">
                <Link to="/confirmation">
                        <button className="buttonMain">Book Now</button>
                </Link>
                <Link to="/booking">
                        <button className="buttonSecondary">Try Again</button>
                </Link>
            </div>
            
        </div>
    );
};

export default Booking;