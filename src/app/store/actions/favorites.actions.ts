import {createAction, props} from '@ngrx/store';
import {Product} from "../../core/models/products.model";

export const addFavorite = createAction('[Favorites] Add Favorite', props<{ product: Product }>());
export const removeFavorite = createAction('[Favorites] Remove Favorite', props<{ productId: number }>());
export const loadFavorites = createAction('[Favorites] Load Favorites from localStorage');
