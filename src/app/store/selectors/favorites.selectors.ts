import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FavoritesState, favoritesFeatureKey} from '../reducers/favorites.reducer';

export const selectFavoritesState = createFeatureSelector<FavoritesState>(favoritesFeatureKey);

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  state => state.items
);

export const isFavorite = (productId: number) => createSelector(
  selectAllFavorites,
  items => items.some(item => item.id === productId)
);
