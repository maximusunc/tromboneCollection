import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Header from "./components/header";
import Navbar from "./components/navbar";
import Home from "./pages/home.js";
import Instruments from "./pages/instruments.js";
import Details from "./pages/details.js";
import Update from "./pages/update.js";
import UnderConstruction from "./pages/underConstruction.js";
import Login from "./pages/login.js";
import fakeAuth from "./utils/auth.js";
import Admin from "./pages/admin.js";
import Footer from "./components/footer";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
  <Router>
    <MuiThemeProvider>
    <div>
      <Header />
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/instruments" component={Instruments} />
          <Route exact path="/details/" component={Details} />
          <Route exact path="/how-to-use" component={UnderConstruction} />
          <Route exact path="/bibliography" component={UnderConstruction} />
          <Route exact path="/about" component={UnderConstruction} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/update" component={Update} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <Route path="/*" component={Home} />
        </Switch>
      </div>
      <Footer />
    </div>
    </MuiThemeProvider>
  </Router>;

export default App;
