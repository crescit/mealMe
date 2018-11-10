import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getRecipeByID} from "../actions/recipeActions";
import {isEmpty} from "../validation/is-empty";
import { ListGroup, ListGroupItem } from 'reactstrap';

const RecipeContent = (props) => {
    console.log(props.props);
    const recipe = props.props;
    return(<div><ListGroupItem tag="a" href={"/recipe/" + recipe._id}><img className="rounded" style={{height: '36px', width: '36px'}} src={recipe.img}/>{recipe.name}</ListGroupItem></div>)
};
class RecipeItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.props.id,
            recipe: {}
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
                    content = <RecipeContent props={this.props.recipes.randomRecipes[i][0]}/>
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
export default connect(mapStateToProps, {getRecipeByID})(RecipeItem);