import axios from 'axios';
import {GET_USER, GET_ERRORS} from "./types";

export const getUser = (tokenStr) => dispatch => {
    const token = {token: tokenStr};
    axios.post('/api/user/getuser', token).then(res => dispatch({
        type: GET_USER,
        payload: res.data
    })).catch(notfound => {
        axios.post('/api/user/', token).then(res => dispatch({
            type: GET_USER,
            payload: res.data
        })).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
    });
};

export const postRecipeToUser = (recipeId, tokenStr) => dispatch => {
    const token = {token: tokenStr.toString()};
    axios.post(`/api/user/recipes/${recipeId}`, token).then(res => dispatch({
        type: GET_USER,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

export const postToUserShopList = (item, tokenStr) => dispatch => {
    const body = {
        item: item,
        token: tokenStr
    };
    axios.post('/api/user/shoplist', body).then(res => dispatch({
        type: GET_USER,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

export const deleteRecipeFromUser = (recipeId, tokenStr) => dispatch => {
    console.log(`api/user/recipes/${recipeId}/${tokenStr}`);
    axios.delete(`api/user/recipes/${recipeId}/${tokenStr}`).then(res => dispatch({
        type: GET_USER,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));

};
export const deleteShopItemFromUser = (itemID, tokenStr) => dispatch => {
    axios.delete(`api/user/shoplist/${itemID}/${tokenStr}`).then(res => dispatch({
        type: GET_USER,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

