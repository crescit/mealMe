import axios from 'axios';
import {
    CLEAR_ERRORS,
    CREATE_NEW_RECIPE,
    GET_ALL_RECIPES,
    GET_ERRORS,
    GET_RECIPE_BY_INGREDIENT,
    GET_RECIPE_BY_NAME
} from "./types";
import {isEmpty} from "../validation/is-empty";

export const getAllRecipes = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
    axios.get('/api/recipes/recipe/all').then(res => {
        dispatch({
            type: GET_ALL_RECIPES,
            payload: res.data
        })
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
    axios.get(`/api/recipes/ingredients/${term}`).then(res => dispatch({
        type: GET_RECIPE_BY_INGREDIENT,
        payload: res.data
    })).catch(err => dispatch({
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
    axios.get(`/api/recipes/${name}`).then(res => dispatch({
        type: GET_RECIPE_BY_NAME,
        payload: res.data
    })).catch(err => dispatch({
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
    axios.post('/api/recipes/recipe', needed).then(dispatch({
        type: CREATE_NEW_RECIPE,
        payload: true
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};