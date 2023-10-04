import { ADD_TO_CART, COUNTER_CHANGE } from '../constants';
import { foodType } from '../global/types';

export function changeCount(count: number) {
    return {
        type: COUNTER_CHANGE,
        count: count
    }
}

export function addToCart(cartItem: foodType[]) {
    return {
        type: ADD_TO_CART,
        cartItem: cartItem
    }
}