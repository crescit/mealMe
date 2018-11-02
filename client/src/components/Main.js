import React, {Component} from 'react';
import firebase from 'firebase';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: JSON.parse(this.props.auth.user)
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated === false){
            this.props.history.push('/login');
        }
    }
    testRequest = () => {
        axios.get('http://localhost:5000/api/recipes/test').then(res => console.log('got it')).catch(err => console.log('somethings wrong'));
    };
    render(){
        const {user} = this.state;
        return(<div>
            <h1>Main</h1>
            <h2> Welcome {user.displayName} </h2>
            <h3 > Your ID Token is: {user.idToken} </h3>
            <button onClick={() => this.testRequest()}>TEST</button>
        </div>);
    }
}
Main.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(Main));