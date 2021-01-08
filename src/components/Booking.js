import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import TicketHorizontal from './TicketHorizontal';
import TicketVertical from './TicketVertical';

const options = {
    method: 'GET',
    url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/CDG-sky/anytime',
    params: {inboundpartialdate: 'anytime'},
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_SKYSCANNER_KEY,
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
    }
  };

const Booking = () => {

    const [samplePrice, setSamplePrice] = useState(null);

    const getFlightData = async () => {
        axios.request(options)
        .then(function (response) {
            setSamplePrice(response.data.Quotes[0].MinPrice);
            console.log(samplePrice);
        })
        .catch(function (error) {
            console.error(error);
        });
      };

    useEffect(() => {
        getFlightData();
      });

    return (
        <div className="pageContent" id="booking">
            <h1>Pack your bags.</h1>
            {(window.innerWidth < 850) ? (
                <TicketVertical />
            ) : (
                <div>
                <div className="ticketContainer">
                <TicketHorizontal />
                </div>
                <div className="renderData">
                    <h3>Sample Fare</h3>
                    <h4>{samplePrice}</h4>
                </div>
                </div>
            )}
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