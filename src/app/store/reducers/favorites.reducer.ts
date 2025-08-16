import {createReducer, on} from '@ngrx/store';
import {addFavorite, removeFavorite, loadFavorites} from '../actions/favorites.actions';
import {Product} from "../../core/models/products.model";

export const favoritesFeatureKey = 'favorites';

export interface FavoritesState {
  items: Product[];
}

export const initialState: FavoritesState = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]')
};

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, {product}) => {
    const updated = [...state.items, product];
    localStorage.setItem('favorites', JSON.stringify(updated));
    return {...state, items: updated};
  }),
  on(removeFavorite, (state, {productId}) => {
    const updated = state.items.filter(p => p.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updated));
    return {...state, items: updated};
  }),
  on(loadFavorites, state => state) // already loaded from localStorage
);
