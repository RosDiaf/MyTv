import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// -- Components
import Home from "./components/Home";
import Movies from "./components/Movies";
import Channels from "./components/Channels";

// -- Data
import logo from "./assets/img/logo-tv.png";

export default function App() {
  return (
    <Router>
      <div className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <img src={logo} className="navbar-brand" alt="logo" width="50" />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
              <Link to="/channels" className="nav-item nav-link">
                Channels
              </Link>
              <Link to="/movies" className="nav-item nav-link">
                Movies
              </Link>
            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/channels">
            <Channels />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

