import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import errorReducer from "./errorReducer";
import recipeReducer from './recipeReducer';
export default combineReducers({
    auth: authReducer,
    user: userReducer,
    errors: errorReducer,
    recipes: recipeReducer
});

