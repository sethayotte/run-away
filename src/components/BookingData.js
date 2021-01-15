import React, {useState, useEffect, useMemo} from 'react'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'

import {Icon} from 'react-icons-kit'
import {ic_flight_takeoff} from 'react-icons-kit/md/ic_flight_takeoff'
import {ic_flight_land} from 'react-icons-kit/md/ic_flight_land'

const destinationDataset = [
  'AAL',
  'ABQ',
  'ABV',
  'ABZ',
  'ACA',
  'ACC',
  'ADA',
  'ADB',
  'ADD',
  'ADL',
  'ADW',
  'AER',
  'AFW',
  'AGP',
  'AGS',
  'AKL',
  'AKT',
  'ALA',
  'ALC',
  'ALG',
  'ALP',
  'AMA',
  'AMM',
  'AMS',
  'ANC',
  'ARN',
  'ASB',
  'ATH',
  'ATL',
  'ATQ',
  'AUH',
  'AUS',
  'AVL',
  'AYT',
  'BAB',
  'BAD',
  'BAH',
  'BCN',
  'BDL',
  'BEG',
  'BEL',
  'BEY',
  'BFI',
  'BFS',
  'BGO',
  'BGR',
  'BGW',
  'BGY',
  'BHD',
  'BHM',
  'BHX',
  'BIL',
  'BJV',
  'BKK',
  'BKO',
  'BLA',
  'BLL',
  'BLQ',
  'BLR',
  'BLV',
  'BMI',
  'BNA',
  'BNE',
  'BOD',
  'BOG',
  'BOH',
  'BOI',
  'BOJ',
  'BOM',
  'BOO',
  'BOS',
  'BRE',
  'BRI',
  'BRS',
  'BRU',
  'BSB',
  'BSL',
  'BSR',
  'BTS',
  'BUD',
  'BUF',
  'BWI',
  'BWN',
  'BZE',
  'BZZ',
  'CAE',
  'CAG',
  'CAI',
  'CAN',
  'CBM',
  'CBR',
  'CCJ',
  'CCS',
  'CCU',
  'CDG',
  'CEB',
  'CGH',
  'CGK',
  'CGN',
  'CGO',
  'CHA',
  'CHC',
  'CHS',
  'CIA',
  'CID',
  'CJJ',
  'CJU',
  'CKG',
  'CLE',
  'CLT',
  'CMB',
  'CMH',
  'CMN',
  'CNF',
  'CNX',
  'COK',
  'COS',
  'CPH',
  'CPT',
  'CRK',
  'CRL',
  'CRP',
  'CRW',
  'CSX',
  'CTA',
  'CTS',
  'CTU',
  'CUN',
  'CUZ',
  'CVG',
  'CVS',
  'CWB',
  'CWL',
  'DAB',
  'DAC',
  'DAD',
  'DAL',
  'DAM',
  'DAR',
  'DAY',
  'DBQ',
  'DCA',
  'DEL',
  'DEN',
  'DFW',
  'DHA',
  'DJJ',
  'DKR',
  'DLC',
  'DLF',
  'DLH',
  'DLM',
  'DME',
  'DMK',
  'DMM',
  'DNA',
  'DOV',
  'DPS',
  'DRS',
  'DSA',
  'DSM',
  'DSS',
  'DTM',
  'DTW',
  'DUB',
  'DUR',
  'DUS',
  'DVO',
  'DWC',
  'DXB',
  'DYS',
  'EBB',
  'EDI',
  'EDW',
  'EIN',
  'EMA',
  'END',
  'ERI',
  'ERZ',
  'ESB',
  'EVN',
  'EWR',
  'EXT',
  'EZE',
  'FAI',
  'FAO',
  'FCO',
  'FFD',
  'FFO',
  'FIH',
  'FKB',
  'FLL',
  'FLN',
  'FMO',
  'FNA',
  'FOC',
  'FRA',
  'FRU',
  'FSM',
  'FSZ',
  'FTW',
  'FUK',
  'FWA',
  'GBE',
  'GCM',
  'GDL',
  'GDN',
  'GEG',
  'GIG',
  'GLA',
  'GMP',
  'GOA',
  'GOI',
  'GOT',
  'GPT',
  'GRB',
  'GRJ',
  'GRU',
  'GSB',
  'GSO',
  'GSP',
  'GUA',
  'GUM',
  'GUS',
  'GVA',
  'GYD',
  'GZT',
  'HAJ',
  'HAK',
  'HAM',
  'HAN',
  'HAV',
  'HEL',
  'HER',
  'HET',
  'HGH',
  'HIB',
  'HKG',
  'HKT',
  'HMN',
  'HMO',
  'HND',
  'HNL',
  'HOU',
  'HRB',
  'HRE',
  'HRG',
  'HRI',
  'HRK',
  'HSV',
  'HTS',
  'HYD',
  'IAD',
  'IAH',
  'ICN',
  'ICT',
  'IKA',
  'IND',
  'ISE',
  'ISL',
  'ITM',
  'JAN',
  'JAX',
  'JED',
  'JFK',
  'JLN',
  'JNB',
  'JNB',
  'JNB',
  'JUB',
  'KAN',
  'KBP',
  'KEF',
  'KGF',
  'KGL',
  'KHH',
  'KHV',
  'KIN',
  'KIX',
  'KJA',
  'KMG',
  'KNH',
  'KNO',
  'KOJ',
  'KRK',
  'KRT',
  'KTM',
  'KTW',
  'KUF',
  'KUL',
  'KUV',
  'KWE',
  'KWI',
  'KWL',
  'KZN',
  'LAD',
  'LAS',
  'LAX',
  'LBA',
  'LBB',
  'LCA',
  'LCK',
  'LED',
  'LEJ',
  'LEX',
  'LFI',
  'LFT',
  'LGA',
  'LGG',
  'LGW',
  'LHR',
  'LIM',
  'LIN',
  'LIR',
  'LIS',
  'LIT',
  'LJU',
  'LKZ',
  'LLA',
  'LOS',
  'LPA',
  'LPL',
  'LTK',
  'LTN',
  'LTS',
  'LTX',
  'LUF',
  'LUN',
  'LUX',
  'LXR',
  'LYS',
  'MAA',
  'MAD',
  'MAN',
  'MBA',
  'MBS',
  'MCF',
  'MCI',
  'MCO',
  'MCT',
  'MDL',
  'MDW',
  'MED',
  'MEL',
  'MEM',
  'MEX',
  'MFM',
  'MGE',
  'MGM',
  'MHD',
  'MHT',
  'MHZ',
  'MIA',
  'MKE',
  'MLA',
  'MLE',
  'MLI',
  'MLU',
  'MMX',
  'MNL',
  'MOB',
  'MPM',
  'MRS',
  'MRU',
  'MSN',
  'MSP',
  'MSQ',
  'MSY',
  'MTY',
  'MUC',
  'MUO',
  'MVD',
  'MWX',
  'MXP',
  'NAP',
  'NAS',
  'NAT',
  'NAY',
  'NBO',
  'NCE',
  'NCL',
  'NDJ',
  'NGB',
  'NGO',
  'NIM',
  'NKC',
  'NKG',
  'NNG',
  'NRT',
  'NUE',
  'NWI',
  'OAK',
  'ODS',
  'OKA',
  'OKC',
  'OKO',
  'OMA',
  'ONT',
  'OPO',
  'ORD',
  'ORF',
  'ORK',
  'ORY',
  'OSL',
  'OSN',
  'OTP',
  'OUA',
  'OVB',
  'PAM',
  'PBI',
  'PDL',
  'PDX',
  'PEK',
  'PER',
  'PFO',
  'PHF',
  'PHL',
  'PHX',
  'PIA',
  'PIT',
  'PKX',
  'PMI',
  'PMO',
  'PNH',
  'POM',
  'POZ',
  'PPT',
  'PRG',
  'PRN',
  'PSA',
  'PTP',
  'PTY',
  'PUJ',
  'PUS',
  'PVD',
  'PVG',
  'PVR',
  'PWM',
  'QUO',
  'RAR',
  'RDU',
  'REP',
  'RFD',
  'RGN',
  'RIC',
  'RIX',
  'RMS',
  'RND',
  'RNO',
  'ROA',
  'ROB',
  'ROC',
  'ROV',
  'RST',
  'RSW',
  'RUH',
  'SAL',
  'SAN',
  'SAT',
  'SAV',
  'SAW',
  'SBN',
  'SCL',
  'SCQ',
  'SDF',
  'SDQ',
  'SEA',
  'SEZ',
  'SFB',
  'SFO',
  'SGF',
  'SGN',
  'SHA',
  'SHE',
  'SHJ',
  'SID',
  'SIN',
  'SIP',
  'SJC',
  'SJD',
  'SJJ',
  'SJU',
  'SKA',
  'SKG',
  'SKP',
  'SKT',
  'SLC',
  'SMF',
  'SNA',
  'SNN',
  'SOF',
  'SOQ',
  'SOU',
  'SPC',
  'SPI',
  'SPS',
  'SRQ',
  'SSA',
  'SSC',
  'STL',
  'STN',
  'STR',
  'SUB',
  'SUS',
  'SUU',
  'SUX',
  'SVG',
  'SVO',
  'SVX',
  'SXF',
  'SXM',
  'SYD',
  'SYR',
  'SYX',
  'SYZ',
  'SZL',
  'SZX',
  'TAS',
  'TBS',
  'TBZ',
  'TCM',
  'TER',
  'TFN',
  'TFS',
  'TGD',
  'THR',
  'TIA',
  'TIJ',
  'TIK',
  'TIP',
  'TLH',
  'TLL',
  'TLS',
  'TLV',
  'TNA',
  'TNR',
  'TOL',
  'TOS',
  'TPA',
  'TPE',
  'TRD',
  'TRI',
  'TRN',
  'TRV',
  'TSE',
  'TSF',
  'TSN',
  'TUL',
  'TUN',
  'TUS',
  'TXL',
  'TYN',
  'TYS',
  'TZX',
  'UFA',
  'UIO',
  'ULN',
  'UPG',
  'URC',
  'VAR',
  'VBG',
  'VCE',
  'VDA',
  'VIE',
  'VKO',
  'VNO',
  'VPS',
  'VRA',
  'VRN',
  'VVI',
  'WAW',
  'WDH',
  'WLG',
  'WMI',
  'WNZ',
  'WRB',
  'WRO',
  'WUH',
  'XIY',
  'XMN',
  'YEG',
  'YHZ',
  'YOW',
  'YUL',
  'YVR',
  'YWG',
  'YYC',
  'YYJ',
  'YYT',
  'YYZ',
  'ZAG',
  'ZIA',
  'ZNZ',
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

    console.log('baselineDay', baselineDay)
    console.log('baselineMonth', baselineMonth)
    console.log('baselineYear', baselineYear)

    const outboundDayGen = () => {
      let outboundDay = Math.floor(Math.random() * 30) + 1 + baselineDay
      console.log('outboundDay', outboundDay)
      if (outboundDay > 30) {
        baselineMonth = baselineMonth + 1
        outboundDay = outboundDay - 30
      }
    }
    outboundDayGen()
    console.log('outboundDay convert', outboundDay)

    const outboundMonthGen = () => {
      outboundMonth = Math.floor(Math.random() * 8) + 1 + baselineMonth
      console.log('outboundMonth', outboundMonth)
      if (outboundMonth > 12) {
        baselineYear = baselineYear + 1
        outboundMonth = outboundMonth - 12
      }
    }

    outboundMonthGen()

    console.log('outboundMonth convert', outboundMonth)

    outboundYear = baselineYear
    setOutboundDate(`${outboundYear}-${outboundMonth}-${outboundDay}`)
    console.log(outboundDate)

    //Inbound Data Setup
    const tripLengthArray = [4, 7, 10, 14, 18, 21]
    const n = Math.floor(Math.random() * 6)
    const tripDuration = tripLengthArray[n]
    let inboundMonth = outboundMonth
    let inboundYear = outboundYear

    console.log(outboundDay)
    console.log('tripDuration', tripDuration)
    let inboundDay = tripDuration + outboundDay
    console.log(inboundDay)
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
    setInboundDate(`${inboundYear}-${inboundMonth}-${inboundDay}`)
  }

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
      const flightData = await (await axios.request(options))?.data
      if (flightData) {
        const {Places, Quotes, Carriers} = flightData
        // const formattedOutboundDate = dateConversion(
        //   Quotes[0].OutboundLeg.DepartureDate
        // )
        // const formattedInboundDate = dateConversion(
        //   Quotes[0].InboundLeg.DepartureDate
        // )

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
        // setOutboundDate(formattedOutboundDate)
        // setInboundDate(formattedInboundDate)
        setOutboundAirline(outAirline)
        setInboundAirline(inAirline)
        setFare(Quotes[0].MinPrice)
      }
    }

    generateTravelDates()

    getFlightData()
  }, [options])

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
