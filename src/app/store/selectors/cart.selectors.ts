import {createSelector, createFeatureSelector} from '@ngrx/store';
import {CartState} from '../reducers/cart.reducer';

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCart,
  (state: CartState) => state.items
);

export const selectCartCount = createSelector(
  selectCart,
  (state: CartState) => state.items.length
);
