import React, {Component} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loginUser} from '../../actions/authActions';

const config = {
    apiKey: "AIzaSyArkAPtEI89FUVqWC3DXiXMGtx1MpX5vx8",
    authDomain: "mealme-9fb07.firebaseapp.com",
    databaseURL: "https://mealme-9fb07.firebaseio.com",
    projectId: "mealme-9fb07",
    storageBucket: "mealme-9fb07.appspot.com",
    messagingSenderId: "180134463592"
};
firebase.initializeApp(config);

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            googleProvider: new firebase.auth.GoogleAuthProvider(),
        };
    }

    uiConfig = {
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: function(authResult){
                var credential = authResult.credential;
                //if email login
                if(credential === null) {
                    firebase.auth().currentUser.getIdToken(false)
                        .then(idToken => {
                            var token = idToken;
                            firebase.auth().currentUser.getIdToken().then(res => token = res);
                            this.props.loginUser({displayName: firebase.auth().currentUser.displayName, idToken: token});
                            this.props.history.push('/main');
                        })
                        .catch(console.log('failed to get current user'));
                }
                var token;
                firebase.auth().currentUser.getIdToken().then(res => {
                    token = res;
                    this.props.loginUser({displayName: firebase.auth().currentUser.displayName, idToken: token});
                    this.props.history.push('/main');

                });
            }.bind(this)
        },
        signInSuccessUrl: 'http://localhost:3000/main',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ]
    };
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user})
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }
    render(){
        return(<div>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>);
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {loginUser})(withRouter(Login));