import axios from 'axios';
import {
    CLEAR_ERRORS,
    CREATE_NEW_RECIPE,
    GET_ALL_RECIPES,
    GET_ERRORS, GET_RANDOM_RECIPE,
    GET_RECIPE_BY_INGREDIENT,
    GET_RECIPE_BY_NAME, SET_LOADING
} from "./types";
import {isEmpty} from "../validation/is-empty";

export const getAllRecipes = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
    dispatch({
        type: SET_LOADING
    });
    axios.get('/api/recipes/recipe/all').then(res => {
        dispatch({
            type: GET_ALL_RECIPES,
            payload: res.data
        });
        dispatch({
            type: SET_LOADING,
            payload: false
        });
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));

};

export const getRecipesByIngredient = (term) => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
    if(term === undefined){
        dispatch({
            type: GET_ERRORS,
            payload: "term is undefined"
        });
        return;
    }
    dispatch({
        type: SET_LOADING
    });
    axios.get(`/api/recipes/ingredients/${term}`).then(res => {
        dispatch({
            type: GET_RECIPE_BY_INGREDIENT,
            payload: res.data
        });
        dispatch({
            type: SET_LOADING,
            payload: false
        });
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));

};

export const getRecipesByName = (name) => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
    if(name === undefined){
        dispatch({
            type: GET_ERRORS,
            payload: "name is undefined"
        });
        return;
    }
    dispatch({
        type: SET_LOADING
    });
    axios.get(`/api/recipes/${name}`).then(res => {
        dispatch({
            type: GET_RECIPE_BY_NAME,
            payload: res.data
        });
        dispatch({
            type: SET_LOADING,
            payload: false
        });
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));

};

export const createRecipe = (recipe, token) => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
    if(recipe === undefined || token === undefined){
        dispatch({
            type: GET_ERRORS,
            payload: "recipe or token is undefined"
        });
        return;
    }
    dispatch({
        type: SET_LOADING
    });
    const needed = {
        token: token,
        name: isEmpty(recipe.name) ? "": recipe.name,
        img: isEmpty(recipe.img) ? "":recipe.img,
        level: isEmpty(recipe.level) ? "":recipe.level,
        prep: isEmpty(recipe.prep) ? "":recipe.prep,
        cook: isEmpty(recipe.cook) ? "":recipe.cook,
        yield: isEmpty(recipe.yield) ? "":recipe.yield,
        ingredients: isEmpty(recipe.ingredients) ? "":recipe.ingredients,
        directions: isEmpty(recipe.directions) ? "":recipe.directions
    };
    axios.post('/api/recipes/recipe', needed).then( res => {
        dispatch({
            type: CREATE_NEW_RECIPE,
            payload: true
        });
        dispatch({
            type: SET_LOADING,
            payload: false
        });
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));

};

export const getRandomRecipe = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
    dispatch({
        type: SET_LOADING
    });
    axios.get('/api/recipes/random').then(res => {
        dispatch({
            type: GET_RANDOM_RECIPE,
            payload: res.data
        });
        dispatch({
            type: SET_LOADING,
            payload: false
        });
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));

};