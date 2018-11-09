import React, {Component} from 'react';
import {createRecipe} from "../actions/recipeActions";
import {postRecipeToUser} from "../actions/userActions";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {isEmpty} from "../validation/is-empty";
import NavigationBar from "./navigation/Navigationbar";

class Createrecipe extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            ingredients: '',
            directions: '',
            img: '',
            level: '',
            prep: '',
            cook: '',
            yield: '',
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    componentDidMount(){
        if(this.props.auth.isAuthenticated === false && isEmpty(this.props.auth.user)){
            this.props.history.push('/');
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    };
    onChange = (e) => {
        this.setState(
            {[e.target.name]: e.target.value}
        );
    };
    onSubmit = (e) => {
        e.preventDefault();

        const directions = this.state.directions.split(',');
        const ingredients = this.state.ingredients.split(',');
        const newRecipe = {
            name: this.state.name,
            ingredients: ingredients,
            directions: directions,
            img: this.state.img,
            level: this.state.level,
            prep: this.state.prep,
            cook: this.state.cook,
            yield: this.state.cook,
        };
        this.props.createRecipe(newRecipe, this.props.auth.user.idToken);
        setTimeout(() => {
            if(isEmpty(this.props.errors)){
                this.props.postRecipeToUser(this.props.recipes.recipe._id, this.props.auth.user.idToken);
                alert('Recipe Added To User');
                this.props.history.push('/main');
                }
        }, 1000);
    };

    render() {
        const {errors} = this.state;

        return (<div >
            <NavigationBar/>
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1  className="display-4 text-center">
                                Create a Recipe
                            </h1>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.name
                                        })}
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange = {this.onChange}
                                    />
                                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.img
                                        })}
                                        placeholder="Image URL"
                                        value={this.state.img}
                                        onChange = {this.onChange}

                                        name="img"/>
                                    {errors.img && (<div className="invalid-feedback">{errors.img}</div>)}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.level
                                        })}
                                        placeholder="Recipe Difficulty Level"
                                        value={this.state.level}
                                        onChange = {this.onChange}

                                        name="level"/>
                                    {errors.level && (<div className="invalid-feedback">{errors.level}</div>)}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.prep
                                        })}
                                        placeholder="Prep Time"
                                        value={this.state.prep}
                                        onChange = {this.onChange}

                                        name="prep"/>
                                    {errors.prep && (<div className="invalid-feedback">{errors.prep}</div>)}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.cook
                                        })}
                                        placeholder="Cook Time"
                                        value={this.state.cook}
                                        onChange = {this.onChange}

                                        name="cook"/>
                                    {errors.cook && (<div className="invalid-feedback">{errors.cook}</div>)}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.yield
                                        })}
                                        placeholder="Recipe Yields"
                                        value={this.state.yield}
                                        onChange = {this.onChange}

                                        name="yield"/>
                                    {errors.yield && (<div className="invalid-feedback">{errors.yield}</div>)}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.ingredients
                                        })}
                                        placeholder="Ingredients (separate by commas)"
                                        value={this.state.ingredients}
                                        onChange = {this.onChange}

                                        name="ingredients"/>
                                    {errors.ingredients && (<div className="invalid-feedback">{errors.ingredients}</div>)}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            'is-invalid': errors.directions
                                        })}
                                        placeholder="Directions (separate by commas)"
                                        value={this.state.directions}
                                        onChange = {this.onChange}

                                        name="directions"/>
                                    {errors.directions === "recipe validation failed" && (<div className="invalid-feedback">Directions are required</div>)}
                                </div>


                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

}
Createrecipe.propTypes = {
    auth: PropTypes.object.isRequired,
    createRecipe: PropTypes.func.isRequired,
    postRecipeToUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    recipes: state.recipes
});
export default connect(mapStateToProps, {createRecipe, postRecipeToUser})(Createrecipe);