import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {isEmpty} from "../validation/is-empty";
import {getRandomRecipe} from "../actions/recipeActions";

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated === false && isEmpty(this.props.auth.user)){
            this.props.history.push('/');
        }
        if(!isEmpty(this.props.auth.user)){
            this.setState({user: this.props.auth.user});
        }
        for(var i = 0; i < 3; i++){
            this.props.getRandomRecipe();
        }
    }
    render(){
        const {user} = this.state;
        return(<div>
            <h2> Welcome {user.displayName} </h2>
            <button onClick={() => this.getRandomRecipes()}>hi</button>
        </div>);
    }
}
Main.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    recipes: state.recipes
});
export default connect(mapStateToProps, {getRandomRecipe})(withRouter(Main));