import React from "react";
import logo from './logo.svg';
import loading from "./images/loading.png";
import defaultImage from "./images/default.png";
import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import log from "loglevel";


function LandingPage(){
  const history = useHistory();

  React.useEffect(() => {
    setTimeout(() => {
      log.debug("load finished");
      history.push("/default");
    }, 1000);
  }, []);
  
  return(
    <div className="App">
      <img src={loading}   />
    </div>
  );
}

function DefaultPage(){
  return (
    <div className="App">
      <img src={defaultImage}   />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/default" >
          <DefaultPage />
        </Route>
        <Route path="/" >
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
