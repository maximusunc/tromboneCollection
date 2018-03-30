import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import "./pages/pages.css"
import history from "./history.js";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home.js";
import Instruments from "./pages/instruments.js";
import Details from "./pages/details.js";
import Update from "./pages/update.js";
import Create from "./pages/create.js";
import HowToUse from "./pages/howToUse.js";
import Bibliography from "./pages/bibliography.js";
import UnderConstruction from "./pages/underConstruction.js";
import Login from "./pages/login.js";
import fakeAuth from "./utils/auth.js";
import Admin from "./pages/admin.js";

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} exact path="/admin" render={(props) => (
    fakeAuth.isAuthenticated === true
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
      <Header />
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/instruments" component={Instruments} />
          <Route exact path="/details/" component={Details} />
          <Route exact path="/how-to-use" component={HowToUse} />
          <Route exact path="/bibliography" component={Bibliography} />
          <Route exact path="/about" component={UnderConstruction} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/update" component={Update} />
          <PrivateRoute exact path="/create" component={Create} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <Route path="/*" component={Home} />
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>;

export default App;
