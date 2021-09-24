import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Favourite from './Components/Favourite'
import Header from './Components/Header'
import Home from './Components/Home'
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './Components/LoginButton';
import Profile from './Components/Profile';


export class App extends Component {
  render() {
    const { isAuthenticated  } = this.props.auth0;

    return (
      <>
      <Router>
        <Header/>
        <Switch>


          <Route exact path='/'>
            {isAuthenticated ? <Container><Home/></Container> : <LoginButton/> }
          </Route>
          <Route exact path='/Favourite'>
           {isAuthenticated ? <Container><Favourite/></Container> : <LoginButton/>  }
          </Route>
          <Route exact path='/Profile'>
            {isAuthenticated ? <Container><Profile /></Container> : <LoginButton/> }
          </Route>

        </Switch>
      </Router>
        
      </>
    )
  }
}

export default withAuth0(App)
