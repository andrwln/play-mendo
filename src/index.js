import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Landing from './pages/Landing';
import HostGame from './pages/HostGame';
import JoinGame from './pages/JoinGame';
import Game from './pages/game';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Route exact path='/' component={ Landing } />
            <Route exact path='/host' component={ HostGame } />
            <Route exact path='/join' component={ JoinGame } />
            <Route exact path='/game/:id' component={ Game } />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
