import React, {Component} from 'react';
import Login from "../authentication/Login";
import jwt_decode from "jwt-decode";
import store from "../../store";
import {setCurrentUser} from "../../actions/authActions";
import NavigationBar from "./Navigationbar";


if(localStorage.loginInfo){
    const info = JSON.parse(localStorage.loginInfo);
    const decoded = jwt_decode(info.idToken);
    const currentTime = Date.now() / 1000;
    store.dispatch(setCurrentUser(info));

    //TODO:change window location on deployment
    if(window.location.href === 'https://mealme2018.herokuapp.com' && decoded.exp > currentTime && decoded.iat < currentTime){
        window.location.href = '/main ';
    }

}
class Landing extends Component {
    render(){
        return(
            <div className="text-white landing">
                <NavigationBar/>
                <h1 className="p-5">MealMe</h1>
                <h3 className="p-2 lead text-muted">Search and Create Recipes, Add Recipe Ingredients to Your Groceries List, and Change The Way You Do Meals</h3>
                <Login/>

            </div>
        )
    }
}
export default Landing;