import React, {useState, useEffect, useMemo} from 'react'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'

import {Icon} from 'react-icons-kit'
import {ic_flight_takeoff} from 'react-icons-kit/md/ic_flight_takeoff'
import {ic_flight_land} from 'react-icons-kit/md/ic_flight_land'

const destinationDataset = [
  'AKL',
  'AMS',
  'ARN',
  'ATH',
  'ATL',
  'AYT',
  'BCN',
  'BKK',
  'BNE',
  'BOG',
  'BOM',
  'BOS',
  'BRU',
  'BSB',
  'BWI',
  'CAN',
  'CDG',
  'CGH',
  'CGK',
  'CJU',
  'CLT',
  'CPH',
  'CTS',
  'CTU',
  'DCA',
  'DEL',
  'DEN',
  'DFW',
  'DME',
  'DOH',
  'DTW',
  'DUB',
  'DUS',
  'DXB',
  'EWR',
  'FCO',
  'FLL',
  'FRA',
  'FUK',
  'GIG',
  'GMP',
  'GRU',
  'HEL',
  'HGH',
  'HKG',
  'HND',
  'IAD',
  'IAH',
  'ICN',
  'IST',
  'JED',
  'JFK',
  'JNB',
  'KMG',
  'KUL',
  'LAS',
  'LAX',
  'LGA',
  'LGW',
  'LHR',
  'LIS',
  'MAD',
  'MAN',
  'MCO',
  'MDW',
  'MEL',
  'MEX',
  'MIA',
  'MNL',
  'MSP',
  'MUC',
  'MXP',
  'NRT',
  'ORD',
  'ORY',
  'OSL',
  'PEK',
  'PHL',
  'PHX',
  'PMI',
  'PVG',
  'RUH',
  'SAN',
  'SEA',
  'SFO',
  'SHA',
  'SIN',
  'SLC',
  'STN',
  'SVO',
  'SYD',
  'SZX',
  'TPA',
  'TPE',
  'TXL',
  'VIE',
  'XMN',
  'YVR',
  'YYZ',
  'ZRH',
]

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
  const [routeStatus, setRouteStatus] = useState(null)

  const destIndex = Math.floor(Math.random() * destinationDataset.length)

  const requestOutbound = destinationDataset[destIndex]

  //Random Date Generation

  const generateTravelDates = () => {
    //Outbound Data Setup
    const baseline = new Date().toISOString().slice(0, 10)
    let baselineDay = parseInt(baseline.slice(8, 10))
    let baselineMonth = parseInt(baseline.slice(5, 7))
    let baselineYear = parseInt(baseline.slice(0, 4))
    let outboundMonth
    let outboundYear
    let outboundDay
    let randomOutboundDate

    const outboundDayGen = () => {
      outboundDay = Math.floor(Math.random() * 30) + 1 + baselineDay
      if (outboundDay > 30) {
        baselineMonth = baselineMonth + 1
        outboundDay = outboundDay - 30
      }
    }
    outboundDayGen()

    const outboundMonthGen = () => {
      outboundMonth = Math.floor(Math.random() * 8) + 1 + baselineMonth
      if (outboundMonth > 12) {
        baselineYear = baselineYear + 1
        outboundMonth = outboundMonth - 12
      }
    }

    outboundMonthGen()

    outboundYear = baselineYear

    if (outboundMonth < 10) {
      outboundMonth = `0${outboundMonth}`
    }

    if (outboundDay < 10) {
      outboundDay = `0${outboundDay}`
    }

    randomOutboundDate = `${outboundYear}-${outboundMonth}-${outboundDay}`

    //Inbound Data Setup
    const tripLengthArray = [4, 7, 10, 14, 18, 21]
    const n = Math.floor(Math.random() * 6)
    const tripDuration = tripLengthArray[n]
    let inboundMonth = Number(outboundMonth)
    let inboundYear = outboundYear
    let randomInboundDate

    let inboundDay = tripDuration + +outboundDay
    const inboundMonthCheck = () => {
      if (inboundDay > 30) {
        inboundMonth += 1
        inboundDay -= 30
      }
    }
    inboundMonthCheck()
    const inboundYearCheck = () => {
      if (inboundMonth > 12) {
        inboundYear += 1
        inboundMonth -= 12
      }
    }
    inboundYearCheck()

    if (inboundMonth < 10) {
      inboundMonth = `0${inboundMonth}`
    }

    if (inboundDay < 10) {
      inboundDay = `0${inboundDay}`
    }
    randomInboundDate = `${inboundYear}-${inboundMonth}-${inboundDay}`
    return [randomOutboundDate, randomInboundDate]
  }

  const [randomOutboundDate, randomInboundDate] = generateTravelDates()

  //API Request Data Handling

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
      //   const requestStatus = response.status
      const flightData = await (await axios.request(options))?.data
      console.log('request status', options.status)
      let i = 0
      if (flightData.Quotes.length > 0 || i < 15) {
        const {Places, Quotes, Carriers} = flightData
        const formattedOutboundDate = dateConversion(
          Quotes[0].OutboundLeg.DepartureDate
        )
        const formattedInboundDate = dateConversion(
          Quotes[0].InboundLeg.DepartureDate
        )

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
        setRouteStatus(Quotes[0].Direct ? 'direct' : 'indirect')
      } else {
        getFlightData()
        i++
        console.log('attempt number', i)
      }
    }

    generateTravelDates()

    getFlightData()
  }, [options])

  const originSkeletonCheck = () => {
    if (
      originCode != null &&
      setOriginCityName != null &&
      originCountryName != null
    ) {
      return `(${originCode}) ${originCityName}, ${originCountryName}`
    } else {
      return <Skeleton />
    }
  }

  const destinationSkeletonCheck = () => {
    if (
      destinationCode != null &&
      destinationCityName != null &&
      destinationCountryName != null
    ) {
      return `(${destinationCode}) ${destinationCityName}, ${destinationCountryName}`
    } else {
      return <Skeleton />
    }
  }

  const datesSkeletonCheck = () => {
    if (outboundDate !== '0000.00.00' && inboundDate !== '0000.00.00') {
      return `${outboundDate} - ${inboundDate}`
    } else {
      return <Skeleton />
    }
  }

  const itineraryOBSkeletonCheck = () => {
    if (
      outboundAirline != null &&
      inboundAirline != null &&
      routeStatus != null
    ) {
      return ` ${outboundAirline}, ${routeStatus}`
    } else {
      return <Skeleton width={200} />
    }
  }

  const itineraryIBSkeletonCheck = () => {
    if (
      outboundAirline != null &&
      inboundAirline != null &&
      routeStatus != null
    ) {
      return ` ${inboundAirline}, ${routeStatus}`
    } else {
      return <Skeleton width={200} />
    }
  }

  const fareSkeletonCheck = () => {
    if (fare != null) {
      return `${fare}`
    } else {
      return <Skeleton width={85} />
    }
  }

  return (
    <div className='ticketData'>
      <div className='dataContainerL'>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>1</h2>
            <h3>Origin</h3>
          </div>
          <div className='sectionContent'>
            <p>{originSkeletonCheck()}</p>
          </div>
        </div>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>2</h2>
            <h3>Destination</h3>
          </div>
          <div className='sectionContent'>
            <p>{destinationSkeletonCheck()}</p>
          </div>
        </div>
        <div className='sectionContainer'>
          <div className='numHeader'>
            <h2>3</h2>
            <h3>Dates</h3>
          </div>
          <div className='sectionContent'>
            <p>{datesSkeletonCheck()}</p>
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
              {itineraryOBSkeletonCheck()}
            </p>
            <p className='itinerarySecondChild'>
              <Icon size={24} icon={ic_flight_land} />
              {itineraryIBSkeletonCheck()}
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
              ${fareSkeletonCheck()}
              <span id='currencyType'>usd</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingData
