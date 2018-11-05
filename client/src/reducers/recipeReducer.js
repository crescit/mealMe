import {
    CREATE_NEW_RECIPE,
    GET_ALL_RECIPES,
    GET_RECIPE_BY_INGREDIENT,
    GET_RECIPE_BY_NAME,
} from "../actions/types";

const initialState = {
    recipesByName: {},
    recipesByIngredient: {},
    recipes: {},
    success: false
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
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
        case CREATE_NEW_RECIPE:
            return {
                ...state,
                success: action.payload
            };
        default:
            return state;
    }
}