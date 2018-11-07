import React, {Component} from 'react';


const RecipeContent = (props) => {
    const ingredients = props.props.ingredients.map((item) =>
        <li>{item}</li>
    );
    const directions = props.props.directions.map((item) =>
        <li>{item}</li>
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
        this.state = {
            recipe: undefined || this.props.history.location.state
        }
    }
    render(){
        let recipeContent;
        const {recipe} = this.state;
        if(recipe === undefined){
            recipeContent = (<h1>Recipe Not Found</h1>)
        }else{
            recipeContent = <RecipeContent props={recipe}/>
        }
        return(<div>
            {recipeContent}
        </div>)
    }
}

export default Recipe;