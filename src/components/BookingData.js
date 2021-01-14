import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

import { Icon } from 'react-icons-kit'
import {ic_flight_takeoff} from 'react-icons-kit/md/ic_flight_takeoff'
import {ic_flight_land} from 'react-icons-kit/md/ic_flight_land'


const BookingData = ({origin}) => {
  const [fare, setFare] = useState(null);
  const [destinationCode, setDestinationCode] = useState(null);
  const [originCode, setOriginCode] = useState(null);
  const [destinationCityName, setDestinationCityName] = useState(null);
  const [destinationCountryName, setDestinationCountryName] = useState(null);
  const [originCityName, setOriginCityName] = useState(null);
  const [originCountryName, setOriginCountryName] = useState(null);
  const [outboundDate, setOutboundDate] = useState("0000.00.00");
  const [inboundDate, setInboundDate] = useState("0000.00.00");
  const [outboundAirline, setOutboundAirline] = useState(null);
  const [inboundAirline, setInboundAirline] = useState(null);

  const requestOutbound = "SFO";

  const options = {
    method: "GET",
    url:
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/us/usd/us/" + {origin} + "/" + {requestOutbound} + "/anytime/anytime",
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_KEY,
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    },
  };

  const dateConversion = (date) => {
    let str = date;
    let year = str.slice(0, 4);
    let month = str.slice(5, 7);
    let day = str.slice(8, 10);
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const getFlightData = async () => {
      const flightData = await (await axios.request(options))?.data;
      if (flightData) {
        const { Places, Quotes, Carriers } = flightData;
        const formattedOutboundDate = dateConversion(
          Quotes[0].OutboundLeg.DepartureDate
        );
        const formattedInboundDate = dateConversion(
          Quotes[0].InboundLeg.DepartureDate
        );
        const outboundAirlineCheck = () => {
            var i;
            for (i=0; i < Carriers.length; i++) {
                if (Carriers[i].CarrierId == Quotes[0].OutboundLeg.CarrierIds[0]) {
                    return Carriers[i].Name
                } else {
                    return null;
                }
            }
        }
        const inboundAirlineCheck = () => {
            var i;
            for (i=0; i < Carriers.length; i++) {
                if (Carriers[i].CarrierId == Quotes[0].InboundLeg.CarrierIds[0]) {
                    return Carriers[i].Name
                } else {
                    return null;
                }
            }
        }
        const outAirline = outboundAirlineCheck();
        const inAirline = inboundAirlineCheck();

        setDestinationCode(Places[1].IataCode);
        setOriginCode(Places[0].IataCode);
        setDestinationCityName(Places[1].CityName);
        setDestinationCountryName(Places[1].CountryName);
        setOriginCityName(Places[0].CityName);
        setOriginCountryName(Places[0].CountryName);
        setOutboundDate(formattedOutboundDate);
        setInboundDate(formattedInboundDate);
        setOutboundAirline(outAirline);
        setInboundAirline(inAirline);
        setFare(Quotes[0].MinPrice);
      }
    };

    getFlightData();
  }, []);

  return (
    <div className="ticketData">
      <div className="dataContainerL">
        <div className="sectionContainer">
          <div className="numHeader">
            <h2>1</h2>
            <h3>Origin</h3>
          </div>
          <div className="sectionContent">
            <p>
              {`(${originCode}) ${originCityName}, ${originCountryName}` || (
                <Skeleton />
              )}
            </p>
          </div>
        </div>
        <div className="sectionContainer">
          <div className="numHeader">
            <h2>2</h2>
            <h3>Destination</h3>
          </div>
          <div className="sectionContent">
            <p>
              {`(${destinationCode}) ${destinationCityName}, ${destinationCountryName}` || (
                <Skeleton />
              )}
            </p>
          </div>
        </div>
        <div className="sectionContainer">
          <div className="numHeader">
            <h2>3</h2>
            <h3>Dates</h3>
          </div>
          <div className="sectionContent">
            <p>{`${outboundDate} - ${inboundDate}` || <Skeleton />}</p>
          </div>
        </div>
      </div>
      <div className="dataContainerR">
        <div className="sectionContainer">
          <div className="numHeader">
            <h2>4</h2>
            <h3>Itinerary</h3>
          </div>
          <div className="sectionContent">
            <p className="itineraryFirstChild"><Icon size={24} icon={ic_flight_takeoff} />{` ${outboundAirline}, direct`}</p>
            <p className="itinerarySecondChild"><Icon size={24} icon={ic_flight_land} />{` ${inboundAirline}, direct`}</p>
          </div>
        </div>
        <div className="sectionContainer">
          <div className="numHeader">
            <h2>5</h2>
            <h3>Fare</h3>
          </div>
          <div className="sectionContent">
            <p>As low as:</p>
            <p id="farePrice">
              {`$${fare}` || <Skeleton />}
              <span id="currencyType">usd</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingData;
