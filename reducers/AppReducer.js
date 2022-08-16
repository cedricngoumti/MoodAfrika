import {  UPLOADING_INDICATOR_END, UPLOADING_INDICATOR_SUCCESS, UPLOADING_INDICATOR_STARTED } from "../actions/AppActions";

const initialState = {
    name: '',
    email:'',
    error:'',
    uploading:false,
    confirmMessage: false
}


export default (state =initialState,action) => {
    switch(action.type){
        case UPLOADING_INDICATOR_STARTED:
            return {...state, uploading: true,confirmMessage: false};
        case UPLOADING_INDICATOR_END:
            return {...state, uploading: false,confirmMessage: false};
        case UPLOADING_INDICATOR_SUCCESS:
            return {...state, confirmMessage: true};
        default:
            return state
    }
}