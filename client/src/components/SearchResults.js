import React, {Component} from 'react';
import {isEmpty} from "../validation/is-empty";
import {connect} from 'react-redux';
import {getRecipesByName, getRecipesByIngredient} from "../actions/recipeActions";
import NavigationBar from "./navigation/Navigationbar";
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import {postRecipeToUser} from "../actions/userActions";

const RecipeContent = (props) => {
    const recipe = props.props.recipe;
    const idToken = props.props.idToken;
    const postToUser = props.props.post;
    //TODO:change url on a tag on deployment
    return(<ListGroupItem style={{textAlign: 'left'}}tag="a" href={"https://mealme2018.herokuapp.com/recipe/" + recipe._id}>
        <img alt="recipe" src={recipe.img}style={{height: '36px', width:'36px'}}/>{recipe.name}
        <Button color="info"
            onClick={(e) => {
                e.preventDefault();
                postToUser(recipe._id, idToken);
                alert('Recipe added to user');
            }}
        >+</Button>
        </ListGroupItem>)
};
class SearchResults extends Component{
    constructor(props){
        super(props);
        this.state = {
            term: ""
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated === false && isEmpty(this.props.auth.user)){
            this.props.history.push('/');
        }

        const url = window.location.toString();
        const location = url.indexOf('/searchresults/');
        const term = url.slice(location + 15);
        this.setState({ term : term});
        this.props.getRecipesByName(term);
        this.props.getRecipesByIngredient(term);


    }
    render(){
        let term = this.state.term.replace(/_/g, ' ');
        let ingredientContent;
        let nameContent;
        if(isEmpty(this.props.recipes.recipesByName) || this.props.recipes.recipesByName.length === 0 || this.props.recipes.loading === true){
            nameContent = <ListGroupItem>No recipes found with {term} in name</ListGroupItem>
        }else{
            nameContent = this.props.recipes.recipesByName.map(item => <RecipeContent key={item._id} props={{
                recipe: item,
                post: this.props.postRecipeToUser,
                idToken: this.props.auth.user.idToken
            }}/>)        }
        if(isEmpty(this.props.recipes.recipesByIngredient) || this.props.recipes.recipesByIngredient.length === 0 || this.props.recipes.loading === true){
            ingredientContent = <ListGroupItem>No recipes found with {term} in the ingredients</ListGroupItem>
        }else{
            ingredientContent = this.props.recipes.recipesByIngredient.map(item => <RecipeContent key={item._id} props={{
                recipe: item,
                post: this.props.postRecipeToUser,
                idToken: this.props.auth.user.idToken
            }}/>)
        }
        return(
            <div>
                <NavigationBar/>
                <h1>Search Results</h1>
                <h3>Search Results By Name</h3>
                <ListGroup>
                {nameContent}
                </ListGroup>
                <h3>Search Results By Ingredient</h3>
                <ListGroup>
                {ingredientContent}
                </ListGroup>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
   auth: state.auth,
   recipes: state.recipes,
    user: state.user
});
export default connect(mapStateToProps, {getRecipesByName, getRecipesByIngredient, postRecipeToUser} )(SearchResults);