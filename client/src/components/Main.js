import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {isEmpty} from "../validation/is-empty";
import {getRandomRecipe} from "../actions/recipeActions";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import NavigationBar from "./navigation/Navigationbar";

var items = [
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
];
class Main extends Component{
    constructor(props){
            super(props);
            this.state = { activeIndex: 0 };
            this.next = this.next.bind(this);
            this.previous = this.previous.bind(this);
            this.goToIndex = this.goToIndex.bind(this);
            this.onExiting = this.onExiting.bind(this);
            this.onExited = this.onExited.bind(this);
    }
    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
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

    goToRecipe(item){
        const name = item.caption;
        let recipeIndex = 0;
        for(var i = 0; i < 3; i++){
            if(this.props.recipes.randomRecipes[i] !== undefined && this.props.recipes.randomRecipes[i].name === name){
                recipeIndex = i;
            }
        }
        this.props.history.push(`/recipe/${this.props.recipes.randomRecipes[recipeIndex]._id}`, this.props.recipes.randomRecipes[recipeIndex]);
    }
    render(){
        const { activeIndex } = this.state;
        const { loading, randomRecipes} = this.props.recipes;
        if(!loading && randomRecipes.length === 3){
            items =
                [
                    {
                        src: randomRecipes[0].img,
                        altText: randomRecipes[0].name,
                        caption: randomRecipes[0].name
                    },
                    {
                        src: randomRecipes[1].img,
                        altText: randomRecipes[1].name,
                        caption: randomRecipes[1].name
                    },
                    {
                        src: randomRecipes[2].img,
                        altText: randomRecipes[2].name,
                        caption: randomRecipes[2].name
                    }
                ];

        }
        const slides = items.map((item) => {
            return (

                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img onClick={() => this.goToRecipe(item)} style={{height: '312px', width: '512px'}}src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                    <div className="mt-3">
                        <h6>{item.caption}</h6>
                    </div>
                </CarouselItem>


            );
        });
        return(<div>
            <NavigationBar/>
            <h2> Welcome {this.props.auth.user.displayName} </h2>
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        </div>);
    }
}
Main.propTypes = {
    auth: PropTypes.object.isRequired,
    recipes: PropTypes.object.isRequired,
    getRandomRecipe: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    recipes: state.recipes
});
export default connect(mapStateToProps, {getRandomRecipe})(withRouter(Main));