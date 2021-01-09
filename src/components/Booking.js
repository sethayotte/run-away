import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import TicketHorizontal from './TicketHorizontal';
import TicketVertical from './TicketVertical';
import BookingData from './BookingData';

const Booking = () => {

    return (
        <div className="pageContent" id="booking">
            <h1>Pack your bags.</h1>
            {(window.innerWidth < 850) ? (
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