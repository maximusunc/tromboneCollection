import React from 'react';
import { Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import "./pages/pages.css"
import history from "./history.js";
import MainLayout from "./components/mainLayout";
import EmptyLayout from "./components/emptyLayout";
import Home from "./pages/home.js";
import Instruments from "./pages/instruments.js";
import Details from "./pages/details.js";
import MinDetails from "./pages/minDetails.js";
import Update from "./pages/update.js";
import Create from "./pages/create.js";
import HowToUse from "./pages/howToUse.js";
import Bibliography from "./pages/bibliography.js";
import Contact from "./pages/contact.js";
import Login from "./pages/login.js";
import auth from "./utils/auth.js";
import Admin from "./pages/admin.js";

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} exact path="/admin" render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: {from: props.location}
        }} />
  )} />
)

const App = () => 
  <Router history={history}>
    <div>
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
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/instruments" component={Instruments} />
            <Route exact path="/details" component={Details} />
            <Route exact path="/how-to-use" component={HowToUse} />
            <Route exact path="/bibliography" component={Bibliography} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/update" component={Update} />
            <PrivateRoute exact path="/create" component={Create} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <Route path="/*" component={Home} />
          </Switch>
        </MainLayout>
      </Switch>
    </div>
  </Router>;

export default App;