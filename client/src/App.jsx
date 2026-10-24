import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import './App.css';
import './pages/pages.css'
import MainLayout from './layouts/mainLayout/MainLayout';
import EmptyLayout from './layouts/emptyLayout/EmptyLayout';
import Home from './pages/home/Home';
import Instruments from './pages/instruments/Instruments';
import Details from './pages/instruments/details/Details';
import MinDetails from './pages/MinDetails';
import HowToUse from './pages/HowToUse';
import Bibliography from './pages/Bibliography';
import Contact from './pages/contact/Contact';

import useTrombones from './utils/useTrombones';
import TromboneContext from './context/trombones';

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
              <Route path="/*" component={Home} />
            </Switch>
          </MainLayout>
        </Switch>
      </TromboneContext.Provider>
    </BrowserRouter>
  );
}
