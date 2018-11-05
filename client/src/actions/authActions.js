import {GET_ERRORS, SET_CURRENT_USER} from "./types";

export const loginUser = (user) => dispatch => {
    if(user === undefined){
        dispatch({
            type: GET_ERRORS,
            payload: "user is undefined"
        });
        return;
    }
    localStorage.setItem('loginInfo', JSON.stringify(user));
    dispatch(setCurrentUser(user))
};
export const logoutUser = () => dispatch => {
    localStorage.removeItem('loginInfo');
    dispatch(setCurrentUser())
};

//set logged in user
export const setCurrentUser = (payload) => {
    return {
        type: SET_CURRENT_USER,
        payload: payload
    }
};