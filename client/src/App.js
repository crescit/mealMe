import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';


//import components below
import Main from './components/Main';
import Login from './components/authentication/Login';
import Landing from './components/navigation/Landing';
import Recipe from './components/Recipe';
import Createrecipe from './components/Createrecipe';
import BrowseRecipes from './components/browserecipes/BrowseRecipes';
//import actions below
import {logoutUser, setCurrentUser} from "./actions/authActions";

if(localStorage.loginInfo){
    const info = JSON.parse(localStorage.loginInfo);
    const decoded = jwt_decode(info.idToken);
    const currentTime = Date.now() / 1000;
    store.dispatch(setCurrentUser(info));

    //checking constraints for identification token
    if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href = '/';
    }
    if(decoded.iat > currentTime){
        store.dispatch(logoutUser());
        window.location.href = '/';
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <Provider store={store}>
          <Router>
              <div>
                  <Switch>
                      <Route exact path="/" component={Landing}/>
                  </Switch>
              <Switch>
                  <Route exact path="/login" component={Login}/>
              </Switch>
                  <Switch>
                      <Route exact path="/main" component={Main}/>
                  </Switch>
                  <Switch>
                      <Route exact path="/recipe/:id" component={Recipe}/>
                  </Switch>
                  <Switch>
                      <Route exact path="/createrecipe" component={Createrecipe}/>
                  </Switch>
                  <Switch>
                      <Route exact path="/browserecipes" component={BrowseRecipes}/>
                  </Switch>
              </div>
          </Router>
          </Provider>
      </div>
    );
  }
}

export default App;
