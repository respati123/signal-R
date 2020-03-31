import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import './assets/styles.css';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={props => <Home {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
