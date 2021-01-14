import React, {useState, useEffect, useMemo} from 'react'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'

import {Icon} from 'react-icons-kit'
import {ic_flight_takeoff} from 'react-icons-kit/md/ic_flight_takeoff'
import {ic_flight_land} from 'react-icons-kit/md/ic_flight_land'

const BookingData = (props) => {
  const {origin} = props
  const [fare, setFare] = useState(null)
  const [destinationCode, setDestinationCode] = useState(null)
  const [originCode, setOriginCode] = useState(null)
  const [destinationCityName, setDestinationCityName] = useState(null)
  const [destinationCountryName, setDestinationCountryName] = useState(null)
  const [originCityName, setOriginCityName] = useState(null)
  const [originCountryName, setOriginCountryName] = useState(null)
  const [outboundDate, setOutboundDate] = useState('0000.00.00')
  const [inboundDate, setInboundDate] = useState('0000.00.00')
  const [outboundAirline, setOutboundAirline] = useState(null)
  const [inboundAirline, setInboundAirline] = useState(null)

  const requestOutbound = 'SFO'

  const options = useMemo(
    () => ({
      method: 'GET',
      url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/us/usd/us/${origin}/${requestOutbound}/anytime/anytime`,
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_SKYSCANNER_KEY,
        'x-rapidapi-host':
          'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
      },
    }),
    [origin]
  )

  const dateConversion = (date) => {
    let str = date
    let year = str.slice(0, 4)
    let month = str.slice(5, 7)
    let day = str.slice(8, 10)
    return `${month}/${day}/${year}`
  }

  useEffect(() => {
    const getFlightData = async () => {
      const flightData = await (await axios.request(options))?.data
      if (flightData) {
        const {Places, Quotes, Carriers} = flightData
        const formattedOutboundDate = dateConversion(
          Quotes[0].OutboundLeg.DepartureDate
        )
        const formattedInboundDate = dateConversion(
          Quotes[0].InboundLeg.DepartureDate
        )
        // const outboundAirlineCheck = () => {
        //   var i
        //   for (i = 0; i < Carriers.length; i++) {
        //     if (Carriers[i].CarrierId === Quotes[0].OutboundLeg.CarrierIds[0]) {
        //       return Carriers[i].Name
        //     } else {
        //       return null
        //     }
        //   }
        // }

        //THIS IS A BETTER WAY TO DO THE ABOVE
        const outboundAirlineCheck = () => {
          const carrier = Carriers.filter(
            (carrier) =>
              carrier.CarrierId === Quotes[0].OutboundLeg.CarrierIds[0]
          )[0]
          if (carrier) return carrier.Name
          return null
        }

        // const inboundAirlineCheck = () => {
        //   var i
        //   for (i = 0; i < Carriers.length; i++) {
        //     if (Carriers[i].CarrierId === Quotes[0].InboundLeg.CarrierIds[0]) {
        //       return Carriers[i].Name
        //     } else {
        //       return null
        //     }
        //   }
        // }

        //THIS IS A BETTER WAY TO DO THE ABOVE
        const inboundAirlineCheck = () => {
          for (const carrier of Carriers) {
            if (carrier.CarrierId === Quotes[0].InboundLeg.CarrierIds[0]) {
              return carrier.Name
            }
            return null
          }
        }

        //The Best way to actually do either of them
        const airlineCheck = (direction) => {
          if (direction !== 'outbound' && direction !== 'inbound') return
          const {OutboundLeg, InboundLeg} = Quotes[0]
          const leg = direction === 'outbound' ? OutboundLeg : InboundLeg
          const carrier = Carriers.filter(
            (carrier) => carrier.CarrierId === leg.CarrierIds[0]
          )[0]
          if (carrier) return carrier.Name
          return null
        }

        const outAirline = airlineCheck('outbound')
        const inAirline = airlineCheck('inbound')

        setDestinationCode(Places[1].IataCode)
        setOriginCode(Places[0].IataCode)
        setDestinationCityName(Places[1].CityName)
        setDestinationCountryName(Places[1].CountryName)
        setOriginCityName(Places[0].CityName)
        setOriginCountryName(Places[0].CountryName)
        setOutboundDate(formattedOutboundDate)
        setInboundDate(formattedInboundDate)
        setOutboundAirline(outAirline)
        setInboundAirline(inAirline)
        setFare(Quotes[0].MinPrice)
      }
    }

    getFlightData()
  }, [options])

  console.log('booking data', props)
  return (
    <div className='ticketData'>
      <div className='dataContainerL'>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>1</h2>
            <h3>Origin</h3>
          </div>
          <div className='sectionContent'>
            <p>
              {`(${originCode}) ${originCityName}, ${originCountryName}` || (
                <Skeleton />
              )}
            </p>
          </div>
        </div>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>2</h2>
            <h3>Destination</h3>
          </div>
          <div className='sectionContent'>
            <p>
              {`(${destinationCode}) ${destinationCityName}, ${destinationCountryName}` || (
                <Skeleton />
              )}
            </p>
          </div>
        </div>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>3</h2>
            <h3>Dates</h3>
          </div>
          <div className='sectionContent'>
            <p>{`${outboundDate} - ${inboundDate}` || <Skeleton />}</p>
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
            <p className='itineraryFirstChild'>
              <Icon size={24} icon={ic_flight_takeoff} />
              {` ${outboundAirline}, direct`}
            </p>
            <p className='itinerarySecondChild'>
              <Icon size={24} icon={ic_flight_land} />
              {` ${inboundAirline}, direct`}
            </p>
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
              {`$${fare}` || <Skeleton />}
              <span id='currencyType'>usd</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingData
