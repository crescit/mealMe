import {GET_USER, SET_LOADING} from "../actions/types";

const initialState = {
        user: {},
        loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
}