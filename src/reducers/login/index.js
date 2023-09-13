import { GET_USER } from "../../actions/index";

const initialState = {
    name: "user"
}

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USER:
            return{
                ...state,
                name: action.payload.name

            };
            default:
                return state;
    }   
}

export default loginReducer