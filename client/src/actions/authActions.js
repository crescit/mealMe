import {SET_CURRENT_USER} from "./types";

export const loginUser = (user) => dispatch => {
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