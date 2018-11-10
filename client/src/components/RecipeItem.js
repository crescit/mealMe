import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getRecipeByID} from "../actions/recipeActions";
import {isEmpty} from "../validation/is-empty";
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import {deleteRecipeFromUser} from "../actions/userActions";

const RecipeContent = (props) => {
    const id = props.props.user.user.idToken;
    const recipe = props.props.recipe;
    const userRecipe = props.props.userRecipe;
    let visible = "";
    return(<div><ListGroupItem style={{display: visible, textAlign: "left"}}tag="a" href={"/recipe/" + recipe._id}><img className="rounded" alt="recipe " style={{height: '36px', width: '36px'}} src={recipe.img}/>{recipe.name}<Button onClick={(e) => {
        e.preventDefault();
        props.props.delete(userRecipe, id);
        window.location.reload(true);
    }} className="rounded" color="danger"> - </Button></ListGroupItem></div>)
};
class RecipeItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.props.id,
            recipeID: props.props.userRecipeID
        };
    }
    componentDidMount(){
        const id = this.props.props.id;
        this.props.getRecipeByID(id);

    }
    render(){
        let content;
        if(isEmpty(this.props.recipes.randomRecipes)){
            content = <h1>Loading</h1>
        }else{
            for(var i = 0; i < this.props.recipes.randomRecipes.length; i++){
                if(this.props.recipes.randomRecipes[i][0]._id === this.props.props.id){
                    //content = <h1>{this.props.recipes.randomRecipes[i][0].name}</h1>
                    content = <RecipeContent  props={{recipe:this.props.recipes.randomRecipes[i][0],
                    user: this.props.auth, delete: this.props.deleteRecipeFromUser, userRecipe: this.state.recipeID}}/>
                }
            };
        }
        return(
            <div>
                <ListGroup>
                {content}
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
export default connect(mapStateToProps, {getRecipeByID, deleteRecipeFromUser})(RecipeItem);