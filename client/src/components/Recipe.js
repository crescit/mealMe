import React, {Component} from 'react';
import NavigationBar from "./navigation/Navigationbar";
import {getRecipesByID} from "../actions/recipeActions";
import {connect} from 'react-redux';
import {isEmpty} from "../validation/is-empty";
import { Container, Row, Col, Button } from 'reactstrap';
import {postRecipeToUser, postToUserShopList} from "../actions/userActions";
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem} from 'reactstrap';


const IngredientItem = (...props) => {
    return(
        <div>
            <Row>
                <ListGroupItem style={{display: "list-item"}} key={props[0].props}>{props[0].props}<Button onClick={() => {
                    props[0].save(props[0].props, props[0].token);
                    alert("Item saved to shopping list");
                }} size="sm" color="primary">+</Button></ListGroupItem>

            </Row>
        </div>
    )
};
const RecipeContent = (props) => {
    const ingredients = props.props.ingredients.map((item) =>
        <IngredientItem key={item} save={props.props.saveToUser} token={props.props.token} props={item}/>
    );
    const directions = props.props.directions.map((item) =>
        <ListGroupItem style={{display: "list-item"}} key={item}>{item}</ListGroupItem>
    );
    return(
        <div>
            <h1>{props.props.name}</h1>
            <img style={{height: '312px', width: '312px'}}alt={props.props.name} src={props.props.img}/>
            <Container>
                <Row>
                    <Col>
                        <p>Prep Time is: {props.props.time}</p>
                    </Col>
                    <Col>
                        <p>Cook time is: {props.props.cook}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Difficulty {props.props.level}</p>
                    </Col>
                    <Col>
                        <p>{props.props.yield}</p>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <h6>Ingredients</h6>
            <ListGroup style={{"list-style": "decimal inside"}}>
                {ingredients}
            </ListGroup>
                    </Col>

                <Col>
                    <h6>Directions</h6>
            <ListGroup style={{"list-style": "decimal inside"}}>
                {directions}
            </ListGroup>
                </Col>
                </Row>
            </Container>
        </div>)
};
class Recipe extends Component{

    componentDidMount(){
        if(this.props.auth.isAuthenticated === false && isEmpty(this.props.auth.user)){
            this.props.history.push('/');
        }
        var index = window.location.href.indexOf("/recipe/");
        var id = window.location.href.slice(index + 8, ).trim();

        this.props.getRecipesByID(id);

    }

    saveRecipe(){
        if(!isEmpty(this.props.auth.user)){
            var index = window.location.href.indexOf("/recipe/");
            var id = window.location.href.slice(index + 8, ).trim();
            this.props.postRecipeToUser(id, this.props.auth.user.idToken);
            alert('recipe successfully added');
        }
    }
    render(){
        let recipeContent;
        if(this.props.recipes.loading === true || isEmpty(this.props.recipes.recipe)){
            recipeContent = <h5>Loading</h5>;
        }else if(this.props.recipes.loading === false && !isEmpty(this.props.recipes.recipe)){
            this.props.recipes.recipe[0].token = this.props.auth.user.idToken;
            this.props.recipes.recipe[0].saveToUser = this.props.postToUserShopList;
            recipeContent = (<div>
                <RecipeContent props={this.props.recipes.recipe[0]}/>
                <Button onClick={() => this.saveRecipe()}>Save Recipe</Button>
            </div>)

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
Recipe.propTypes = {
    recipes: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getRecipesByID: PropTypes.func.isRequired,
    postRecipeToUser: PropTypes.func.isRequired,
    postToUserShopList: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    recipes: state.recipes,
    error: state.errors,
    auth: state.auth
});
export default connect(mapStateToProps, {getRecipesByID, postRecipeToUser, postToUserShopList})(Recipe);