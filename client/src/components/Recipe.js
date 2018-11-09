import React, {Component} from 'react';
import NavigationBar from "./navigation/Navigationbar";
import {getRecipesByID} from "../actions/recipeActions";
import {connect} from 'react-redux';
import {isEmpty} from "../validation/is-empty";

const RecipeContent = (props) => {
    const ingredients = props.props.ingredients.map((item) =>
        <li key={item}>{item}</li>
    );
    const directions = props.props.directions.map((item) =>
        <li key={item}>{item}</li>
    );
    return(
        <div>
            <h1>{props.props.name}</h1>
            <img alt={props.props.name} src={props.props.img}/>
            <p>Cook time is: {props.props.cook}</p>
            <p>Difficulty {props.props.level}</p>
            <p>Prep Time is: {props.props.time}</p>
            <p>{props.props.yield}</p>
            <h6>Ingredients</h6>
            <ol>
                {ingredients}
            </ol>
            <h6>Directions</h6>

            <ol>
                {directions}
            </ol>
        </div>)
};
class Recipe extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        var index = window.location.href.indexOf("/recipe/");
        var id = window.location.href.slice(index + 8, ).trim();

        this.props.getRecipesByID(id);

    }
    render(){
        let recipeContent;
        if(this.props.recipes.loading === true || isEmpty(this.props.recipes.recipe)){
            recipeContent = <h5>Loading</h5>;
        }else if(this.props.recipes.loading === false && !isEmpty(this.props.recipes.recipe)){
            recipeContent = <RecipeContent props={this.props.recipes.recipe[0]}/>
        }
        if(this.props.recipes.loading === false && isEmpty(this.props.recipes.recipe)){
            recipeContent = (<h1>Recipe Not Found</h1>)
        }
        return(<div>
            <NavigationBar/>
            {recipeContent}
        </div>)
    }
}
const mapStateToProps = (state) => ({
    recipes: state.recipes,
    error: state.errors
});
export default connect(mapStateToProps, {getRecipesByID})(Recipe);