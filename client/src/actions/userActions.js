import axios from 'axios';
import {GET_USER, GET_ERRORS, CLEAR_ERRORS, SET_LOADING} from "./types";

export const getUser = (tokenStr) => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
    dispatch({
        type: SET_LOADING,
        payload: true
    });
    if(tokenStr === undefined){
        dispatch({
            type: GET_ERRORS,
            payload: 'token is undefined'
        });
        return;
    }
    const token = {token: tokenStr};
    axios.post('/api/user/getuser', token).then(res => {
        dispatch({
            type: GET_USER,
            payload: res.data
        });
        dispatch({
            type: SET_LOADING,
            payload: false
        });
        return res.data;
    }).catch(notfound => {
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
    dispatch({
        type: CLEAR_ERRORS
    });
    if(recipeId === undefined || tokenStr === undefined){
        dispatch({
            type: GET_ERRORS,
            payload: 'recipe ID or token is undefined'
        });
        return;
    }
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
    dispatch({
        type: CLEAR_ERRORS
    });
    if(item === undefined || tokenStr === undefined){
        dispatch({
            type: GET_ERRORS,
            payload: 'item or token is undefined'
        });
        return;
    }
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
    dispatch({
        type: CLEAR_ERRORS
    });
    if(recipeId === undefined || tokenStr === undefined){
        dispatch({
            type: GET_ERRORS,
            payload: 'recipe id or token is undefined'
        });
        return;
    }
    axios.delete(`api/user/recipes/${recipeId}/${tokenStr}`).then(res => dispatch({
        type: GET_USER,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));

};
export const deleteShopItemFromUser = (itemID, tokenStr) => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
    if(itemID === undefined || tokenStr === undefined){
        dispatch({
            type: GET_ERRORS,
            payload: 'itemID or token is undefined'
        });
        return;
    }
    axios.delete(`api/user/shoplist/${itemID}/${tokenStr}`).then(res => dispatch({
        type: GET_USER,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

