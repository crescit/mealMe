import React, {Component} from 'react';
import Login from "./authentication/Login";
class Landing extends Component {
    render(){
        return(
            <div className="text-white landing">
            <h1 className="p-5">MealMe</h1>
                <h3 className="p-2 lead text-muted">Search and Create Recipes, Add Recipe Ingredients to Your Groceries List, and Change The Way You Do Meals</h3>
                <Login/>

            </div>
        )
    }
}
export default Landing;