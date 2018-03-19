import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./components/header";
import Navbar from "./components/navbar";
import Home from "./pages/home.js";
import Instruments from "./pages/instruments.js";
import Details from "./pages/details.js";
import UnderConstruction from "./pages/underConstruction.js";
import Footer from "./components/footer";

const App = () => 
  <Router>
    <div>
      <Header />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/instruments" component={Instruments} />
        <Route exact path="/details/" component={Details} />
        <Route exact path="/how-to-use" component={UnderConstruction} />
        <Route exact path="/bibliography" component={UnderConstruction} />
        <Route exact path="/about" component={UnderConstruction} />
        <Route path="/*" component={Home} />
      </Switch>
      <Footer />
    </div>
  </Router>;

export default App;
