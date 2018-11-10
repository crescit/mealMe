import React, {Component} from 'react';
import NavigationBar from './navigation/Navigationbar';
import {isEmpty} from "../validation/is-empty";
import { connect } from 'react-redux';

class ShoppingList extends Component{
    componentDidMount(){
        if(this.props.auth.isAuthenticated === false && isEmpty(this.props.auth.user)){
            this.props.history.push('/');
        }
    }
    render(){
        return(<div>
            <NavigationBar/>
            <h1>Shopping List</h1>
        </div>)
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    recipes: state.recipes
});
export default connect(mapStateToProps)(ShoppingList);