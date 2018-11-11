import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import { connect } from 'react-redux';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let val = 'true';

        if(window.location.href === 'https://mealme2018.herokuapp.com'){
            val = 'none'
        }
        window.setInterval(function(){
            if(window.location.href !== 'https://mealme2018.herokuapp.com'){
                val = 'true'
            }
        }, 1000);
        let content = (<Nav style={{display: val}} className="ml-auto" navbar>
            <NavItem>
                <NavLink href="/shoppinglist">My Shopping List</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/myrecipes">My Recipes</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/browserecipes">Browse Recipes</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/createrecipe">Create A Recipe</NavLink>
            </NavItem>
        </Nav>);

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/main">mealMe</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {content}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
   auth: state.auth
});
export default connect(mapStateToProps)(NavigationBar);