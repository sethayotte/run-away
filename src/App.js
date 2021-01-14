import React, {useState} from 'react'
import './sass/App.scss'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Menu from './components/Menu'
import Landing from './components/Landing'
import Origin from './components/Origin'
import Booking from './components/Booking'
import BookingData from './components/BookingData'
import Confirmation from './components/Confirmation'

function App() {
  const [origin, setOrigin] = useState('')

  return (
    <Router>
      <div className='App'>
        <Menu />
      </div>

      <Switch>
        <Route path='/origin'>
          <Origin origin={origin} setOrigin={setOrigin} />
        </Route>
        <Route path='/booking'>
          <Booking origin={origin} />
        </Route>
        <Route path='/booking-data'>
          <BookingData origin={origin} />
        </Route>
        <Route path='/confirmation'>
          <Confirmation />
        </Route>
        <Route path='/'>
          <Landing />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
