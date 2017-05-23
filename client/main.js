import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../imports/App.js';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from'react-router-dom';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  const router = (
    <Router>
      <div>
        <Route path={`/board/:session`} component={App}/>
      </div>
    </Router>
  )
  ReactDOM.render(router, root);
})
