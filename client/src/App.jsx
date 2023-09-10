import React from 'react';
import {
  BrowserRouter, Route,
  Redirect, Switch,
} from 'react-router-dom';

import './App.css';
import './pages/pages.css'
import MainLayout from './layouts/mainLayout/MainLayout';
import EmptyLayout from './layouts/emptyLayout/EmptyLayout';
import Home from './pages/home/Home';
import Instruments from './pages/instruments/Instruments';
import Details from './pages/instruments/details/Details';
import MinDetails from './pages/MinDetails';
import EditTrombone from './pages/editTrombone/Edit';
import HowToUse from './pages/HowToUse';
import Bibliography from './pages/Bibliography';
import Contact from './pages/contact/Contact';
import Login from './pages/admin/Login';
import Admin from './pages/admin/Admin';

import useTrombones from './utils/useTrombones';
import TromboneContext from './context/trombones';

function readCookie() {
  var cookieName = 'authorized=';
  const key = 'ecb0705c8343ba8dca57c2317dc23baae5f0a6fca6ea36b96aa698ed6db8d515';
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var name = cookies[i];
    while (name.charAt(0) === ' ') name = name.substring(1, name.length);
    if (name.indexOf(cookieName) === 0 && name.indexOf(key) > -1) return true;
  }
  return false;
};

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} exact path='/admin' render={(props) => (
    (readCookie() === true)
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: {from: props.location}
        }} />
  )} />
)

export default function App() {
  const trombones = useTrombones();

  return (
    <BrowserRouter>
      <TromboneContext.Provider value={trombones}>
      {/* this outer switch case is just for the empty layout to not load all the css */}
        <Switch>
          <Route exact path="/api/details/*">
            {/* this loads minimal css and just the information for a specific instrument */}
            <EmptyLayout>
              <MinDetails />
            </EmptyLayout>
          </Route>
          {/* if the empty layout isn't hit, load the rest of the css in */}
          <MainLayout>
            {/* this inner switch is for the main page routes */}
            <Switch>
              <Route exact path="/instruments" component={Instruments} />
              <Route exact path="/details/*" component={Details} />
              <Route exact path="/how-to-use" component={HowToUse} />
              <Route exact path="/bibliography" component={Bibliography} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/update/*" component={EditTrombone} />
              <PrivateRoute exact path="/create/" component={EditTrombone} />
              <PrivateRoute exact path="/admin" component={Admin} />
              <Route path="/*" component={Home} />
            </Switch>
          </MainLayout>
        </Switch>
      </TromboneContext.Provider>
    </BrowserRouter>
  );
}
