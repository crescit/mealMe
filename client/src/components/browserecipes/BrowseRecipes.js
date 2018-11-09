import React, {Component} from 'react';
import NavigationBar from "../navigation/Navigationbar";
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getRecipesByAlph, getRecipesByNum} from "../../actions/recipeActions";
import {isEmpty} from "../../validation/is-empty";

class BrowseRecipes extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.getRecipesByNum();
    }
    handleClick = (event) => {
        //if the number was selected search for a regular expression for all numbers
        if(event.target.value === '123'){
            this.props.getRecipesByNum();
        }
        else{
            this.props.getRecipesByAlph(event.target.value);
        }
    };
    render(){
        let content;
        if(this.props.recipes.loading === true || isEmpty(this.props.recipes.recipesByName)){
            content = <h5>No Recipes Found</h5>;
        }
        else{
            content = this.props.recipes.recipesByName.map(item => <Col style={{"text-align": 'left'}}><a href={"recipe/" + item._id} key={item._id}>{item.name}</a></Col>)
        }
        return(<div>
            <NavigationBar/>
            <h1>Browse Recipes</h1>
            <Container>
                <Row>
                <Col>
                    <Button value="123" onClick={this.handleClick}>123</Button>
                    <Button value="a" onClick={this.handleClick}>a</Button>
                    <Button value="b" onClick={this.handleClick}>b</Button>
                    <Button value="c" onClick={this.handleClick}>c</Button>
                    <Button value="d" onClick={this.handleClick}>d</Button>
                    <Button value="e" onClick={this.handleClick}>e</Button>
                    <Button value="f" onClick={this.handleClick}>f</Button>
                    <Button value="g" onClick={this.handleClick}>g</Button>
                    <Button value="h" onClick={this.handleClick}>h</Button>
                    <Button value="i" onClick={this.handleClick}>i</Button>
                    <Button value="j" onClick={this.handleClick}>j</Button>
                    <Button value="k" onClick={this.handleClick}>k</Button>
                    <Button value="l" onClick={this.handleClick}>l</Button>
                    <Button value="m" onClick={this.handleClick}>m</Button>
                </Col>
            </Row>
                <Row>
                    <Col>
                        <Button value="n" onClick={this.handleClick}>n</Button>
                        <Button value="o" onClick={this.handleClick}>o</Button>
                        <Button value="p" onClick={this.handleClick}>p</Button>
                        <Button value="q" onClick={this.handleClick}>q</Button>
                        <Button value="r" onClick={this.handleClick}>r</Button>
                        <Button value="s" onClick={this.handleClick}>s</Button>
                        <Button value="t" onClick={this.handleClick}>t</Button>
                        <Button value="u" onClick={this.handleClick}>u</Button>
                        <Button value="v" onClick={this.handleClick}>v</Button>
                        <Button value="w" onClick={this.handleClick}>w</Button>
                        <Button value="x" onClick={this.handleClick}>x</Button>
                        <Button value="y" onClick={this.handleClick}>y</Button>
                        <Button value="z" onClick={this.handleClick}>z</Button>
                    </Col>
                </Row>
            </Container>
            {content}
        </div>)
    }
}


BrowseRecipes.propTypes = {
    auth: PropTypes.object.isRequired,
    recipes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    recipes: state.recipes
});
export default connect(mapStateToProps, {getRecipesByAlph, getRecipesByNum})(BrowseRecipes);