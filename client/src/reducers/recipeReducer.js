import {
    CREATE_NEW_RECIPE,
    GET_ALL_RECIPES, GET_RANDOM_RECIPE,
    GET_RECIPE_BY_INGREDIENT,
    GET_RECIPE_BY_NAME,
    SET_LOADING, GET_RECIPE_BY_ID, GET_RECIPES
} from "../actions/types";

const initialState = {
    recipesByName: {},
    recipesByIngredient: {},
    recipes: {},
    recipe: {},
    randomRecipes: [],
    myrecipes: [],
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
            };
        case GET_RECIPES:
            return {
                ...state,
                myrecipes: [action.payload, ...state.myrecipes]
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case GET_RANDOM_RECIPE:
            return {
                ...state,
                randomRecipes: [action.payload, ...state.randomRecipes]
            };
        case GET_RECIPE_BY_NAME:
            return {
                ...state,
                recipesByName: action.payload
            };
        case GET_RECIPE_BY_INGREDIENT:
            return {
                ...state,
                recipesByIngredient: action.payload
            };
        case GET_RECIPE_BY_ID:
            return{
                ...state,
                recipe: action.payload
            };
        case CREATE_NEW_RECIPE:
            return {
                ...state,
                recipe: action.payload
            };
        default:
            return state;
    }
}