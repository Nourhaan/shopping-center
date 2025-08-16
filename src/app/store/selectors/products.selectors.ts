import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductsState} from '../reducers/products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

export const selectProductsByCategory = createSelector(
  selectProductsState,
  (state) => state.productsByCategory
);
