import {createReducer, on} from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import {Product} from "../../core/models/products.model";

export interface CartState {
  items: Product[];
}

// Load from localStorage if available
const savedItems = localStorage.getItem('cart');

export const initialState: CartState = {
  items: savedItems ? JSON.parse(savedItems) : [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, {product}) => ({
    ...state,
    items: [...state.items, product],
  })),
  on(CartActions.removeFromCart, (state, {productId}) => ({
    ...state,
    items: state.items.filter(item => item.id !== productId),
  })),
);

