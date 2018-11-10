import React, {Component} from 'react';
import NavigationBar from './navigation/Navigationbar';
import {isEmpty} from "../validation/is-empty";
import { connect } from 'react-redux';
import {getUser} from "../actions/userActions";
import {getRecipesByID} from "../actions/recipeActions";
import RecipeItem from './RecipeItem';

class MyRecipes extends Component{
    componentDidMount(){
        if(this.props.auth.isAuthenticated === false && isEmpty(this.props.auth.user)){
            this.props.history.push('/');
        }
        if(this.props.auth.user.idToken !== undefined){
            this.props.getUser(this.props.auth.user.idToken);
        }
    }
    render(){
        let content;
        if(isEmpty(this.props.user.user) || this.props.user.loading === true){
            content = <h2>Loading</h2>
        }else{

            content = this.props.user.user.recipes.map(item =>
                <RecipeItem key={item.recipeid} props={{
                    id: item.recipeid,
                    get: this.props.getRecipesByID
                }}/>
            )

        }
        return(<div>
            <NavigationBar/>
            <h1>My Recipes</h1>
            {content}
        </div>)
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    recipes: state.recipes,
    user: state.user
});
export default connect(mapStateToProps, {getUser, getRecipesByID})(MyRecipes);