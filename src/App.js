import React from "react";
import logo from './logo.svg';
import loading from "./images/loading.png";
import defaultImage from "./images/default.png";
import detailsImage from "./images/details.png";
import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from "react-router-dom";
import log from "loglevel";
import {   TransitionGroup,CSSTransition } from "react-transition-group";


function LandingPage(){
  const history = useHistory();

//  React.useEffect(() => {
//    setTimeout(() => {
//      log.debug("load finished");
//      history.push("/default");
//    }, 1000);
//  }, []);
  function handleClick(){
      log.debug("load finished");
      history.push("/default");
  };
  
  return(
    <div className="App" onClick={handleClick} >
      <img src={loading} />
    </div>
  );
}

function DefaultPage(){
  const history = useHistory();
  log.debug("history action:", history.action);
  function handleClick(){
      log.debug("load finished");
      history.push("/details");
  };
  
  return (
    <div className="App" onClick={handleClick} >
      <img src={defaultImage} />
    </div>
  );
}

function DetailsPage(){
  const history = useHistory();
  function handleClick(){
      log.debug("load finished");
      history.go(-1);
  };
  
  return (
    <div className="App" onClick={handleClick} >
      <img src={detailsImage} />
    </div>
  );
}

const routes = [
  { path: '/home', name: 'Home', Component: LandingPage },
  { path: '/default', name: 'Default', Component: DefaultPage },
  { path: '/details', name: 'Details', Component: DetailsPage },
]

//const routes = [
//  { path: '/', name: 'Home', Component: LandingPage },
//  { path: '/default', name: 'Default', Component: DefaultPage },
//]

function Test(){
  const location = useLocation();
  log.debug("location:", location);
  const history = useHistory();
  log.debug("!history action:", history.action);

  return (
    <div>
    {routes.map(({ path, Component }) => (
      <Route key={path} exact path={path}>
      {({ match }) => (

        <CSSTransition
        in={match != null}
        timeout={3000}
        classNames={`fade-${history.action.toLowerCase()}`}
        unmountOnExit
        >
        <Component />
        </CSSTransition>
      )}
      </Route>
    ))}
    </div>
  );
}

function App() {

  return (
    <Router>
      <Test/>
    </Router>
  );
}

export default App;
