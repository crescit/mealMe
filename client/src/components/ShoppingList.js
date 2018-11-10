import React, {Component} from 'react';
import NavigationBar from './navigation/Navigationbar';
import {isEmpty} from "../validation/is-empty";
import { connect } from 'react-redux';
import {getUser} from "../actions/userActions";
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import {deleteShopItemFromUser} from "../actions/userActions";

const ShoplistItem = (props) => {

    const item = props.props.item;
    const idToken = props.props.idToken;

    return(<ListGroupItem>{item.item}<Button onClick={() => {
        props.props.remove(item._id, idToken);
        window.location.reload(true);
    }} size="sm" color="danger">-</Button></ListGroupItem>)
};
class ShoppingList extends Component{
    componentDidMount(){
        if(this.props.auth.isAuthenticated === false && isEmpty(this.props.auth.user)){
            this.props.history.push('/');
        }
        this.props.getUser(this.props.auth.user.idToken);
    }
    render(){
        let content;
        const user = this.props.user.user;
        if(isEmpty(user)){
            content = <h1>Loading </h1>
        }else{
            content = user.shopList.map(item => <ShoplistItem props={{item: item, idToken: this.props.auth.user.idToken, remove: this.props.deleteShopItemFromUser
            }}
             key={item._id}/>)
        }
        return(<div>
            <NavigationBar/>
            <h1>Shopping List</h1>
            <ListGroup>
            {content}
            </ListGroup>
        </div>)
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    recipes: state.recipes,
    user: state.user
});
export default connect(mapStateToProps, {getUser, deleteShopItemFromUser})(ShoppingList);