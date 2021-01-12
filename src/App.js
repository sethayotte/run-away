import './sass/App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Menu from './components/Menu';
import Landing from './components/Landing';
import Origin from './components/Origin';
import Booking from './components/Booking';
import Confirmation from './components/Confirmation';

function App() {
  return (
    <Router>
    <div className="App">
      <Menu />
    </div>

    <Switch>
          <Route path="/booking">
            <Booking />
          </Route>
          <Route path="/origin">
            <Origin />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
    </Switch>

    </Router>
  );
}


export default App;

