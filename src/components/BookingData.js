import React, { useState, useEffect } from 'react'
import axios from 'axios'

const options = {
  method: 'GET',
  url:
    'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/us/usd/us/sfo/jfk/anytime/anytime',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_SKYSCANNER_KEY,
    'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
  },
}

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data)
//   })
//   .catch(function (error) {
//     console.error(error)
//   })

const BookingData = () => {
  const [fare, setFare] = useState(null)
  const [destinationCode, setDestinationCode] = useState(null)
  const [cityName, setCityName] = useState(null)
  const [countryName, setCountryName] = useState(null)
  const [outboundDate, setOutboundDate] = useState('0000.00.00')
  const [inboundDate, setInboundDate] = useState('0000.00.00')
  const [airline, setAirline] = useState(null)

  const dateConversion = (date) => {
    let str = date
    let year = str.slice(0, 4)
    let month = str.slice(5, 7)
    let day = str.slice(8, 10)
    return `${month}/${day}/${year}`
  }

  //console.log(dateConversion(outboundDate))

  //let obDate = outboundDate
  //let obYear = obDate.slice(0, 4)
  // console.log(obDate.slice(5, 7))
  // console.log(obDate.slice(8, 10))

  useEffect(() => {
    const getFlightData = async () => {
      // axios
      //   .request(options)
      //   .then(function (response) {
      //     setDestinationCode(response.data.Places[0].IataCode)
      //     //console.log(destinationCode)
      //     setCityName(response.data.Places[0].CityName)
      //     //console.log(cityName)
      //     setCountryName(response.data.Places[0].CountryName)
      //     // console.log(countryName)
      //     setOutboundDate(response.data.Quotes[0].OutboundLeg.DepartureDate)
      //     // console.log(outboundDate)
      //     setInboundDate(response.data.Quotes[0].InboundLeg.DepartureDate)
      //     // console.log(inboundDate)
      //     setAirline(response.data.Carriers[0].Name)
      //     //  console.log(airline)
      //     setFare(response.data.Quotes[0].MinPrice)
      //     // console.log(fare)
      //   })
      //   .catch(function (error) {
      //     console.error(error)
      //   })
      const flightData = await (await axios.request(options))?.data
      if (flightData) {
        const { Places, Quotes, Carriers } = flightData
        const formattedOutboundDate = dateConversion(
          Quotes[0].OutboundLeg.DepartureDate
        )
        const formattedInboundDate = dateConversion(
          Quotes[0].InboundLeg.DepartureDate
        )

        setDestinationCode(Places[0].IataCode)
        setCityName(Places[0].CityName)
        setCountryName(Places[0].CountryName)
        setOutboundDate(formattedOutboundDate)
        setInboundDate(formattedInboundDate)
        setAirline(Carriers[0].Name)
        setFare(Quotes[0].MinPrice)
      }
    }

    getFlightData()
  }, [])

  return (
    <div className='ticketData'>
      <div className='dataContainerL'>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>1</h2>
            <h3>Destination</h3>
          </div>
          <div className='sectionContent'>
            <p>
              ({destinationCode}) {cityName}, {countryName}
            </p>
          </div>
        </div>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>2</h2>
            <h3>Dates</h3>
          </div>
          <div className='sectionContent'>
            <p>{`${outboundDate} - ${inboundDate}`}</p>
          </div>
        </div>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>3</h2>
            <h3>Airline</h3>
          </div>
          <div className='sectionContent'>
            <p>{airline}</p>
          </div>
        </div>
      </div>
      <div className='dataContainerR'>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>4</h2>
            <h3>Itinerary</h3>
          </div>
          <div className='sectionContent'>
            <p>10:28 -- 21:10</p>
            <p>07:00 -- 20:49</p>
          </div>
        </div>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>5</h2>
            <h3>Fare</h3>
          </div>
          <div className='sectionContent'>
            <p>As low as:</p>
            <p id='farePrice'>
              ${fare}
              <span id='currencyType'>usd</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingData
