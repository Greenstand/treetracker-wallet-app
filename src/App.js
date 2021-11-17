import React from 'react';
import logo from './logo.svg';
import loading from './images/loading.png';
import defaultImage from './images/default.png';
import Home from './components/Home.js';
import MapPage from './components/MapPage.js';
import TreePage from './components/TreePage.js';
import PlanterPage from './components/PlanterPage.js';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from 'react-router-dom';
import log from 'loglevel';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import theme from './components/common/theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DesktopPage from './components/DesktopPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCoffee);

function LandingPage() {
  const history = useHistory();

  function handleClick() {
    log.debug('load finished');
    history.push('/wallets/180Earth');
  }

  return (
    <div className="App" onClick={handleClick}>
      <Home loaded={handleClick} />
    </div>
  );
}

function DefaultPage() {
  const history = useHistory();
  log.debug('history action:', history.action);
  function handleClick() {
    log.debug('load finished');
    history.push('/details');
  }

  return (
    <div className="App" onClick={handleClick}>
      <img src={defaultImage} />
    </div>
  );
}

function DetailsPage() {
  return (
    <div className="App">
      <TreePage />
    </div>
  );
}

function Root() {
  return <Redirect to={{ pathname: '/landing' }} />;
}

const routes = [
  { path: '/landing', name: 'Home', Component: LandingPage },
  { path: '/default', name: 'Default', Component: DefaultPage },
  { path: '/details', name: 'Details', Component: DetailsPage },
  { path: '/map', name: 'Map', Component: MapPage },
  {
    path: '/wallets/:walletName',
    name: 'Map',
    Component: MapPage,
    DesktopComponent: DesktopPage,
  },
  {
    path: '/wallets/:walletId/trees/:treeId',
    name: 'Tree',
    Component: TreePage,
  },
  {
    path: '/wallets/:walletId/planters/:planterId',
    name: 'Planter',
    Component: PlanterPage,
  },
  { path: '/', name: 'Root', Component: Root, exact: true },
];

function App() {
  const isDesktopScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          {routes.map(({ path, Component, exact, DesktopComponent }) => (
            <Route
              key={path}
              path={path}
              exact={exact || false}
              component={
                isDesktopScreen && DesktopComponent
                  ? DesktopComponent
                  : Component
              }
            />
          ))}
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
