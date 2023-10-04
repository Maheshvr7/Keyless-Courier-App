import { ADD_TO_CART, COUNTER_CHANGE } from '../constants';
import { foodType } from '../global/types';

const initialState = {
    count: 0,
    cartItem : []
};

type actionType = {
    type             : string;
    count            : number;
    cartItem         : foodType[]
} 

const countReducer = (state = initialState, action:actionType) => {
    switch (action.type) {
        case COUNTER_CHANGE:
            return {
                ...state,
                count: action.count
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartItem : action.cartItem
            }    
        default:
            return state;
    }
}
export default countReducer;