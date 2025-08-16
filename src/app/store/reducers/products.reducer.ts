import {createReducer, on} from '@ngrx/store';
import * as ProductsActions from '../actions/products.actions';
import {Product} from "../../core/models/products.model";

export interface ProductsState {
  products: Product[];
  productsByCategory: Product[];
  error: any;
}

export const initialState: ProductsState = {
  products: [],
  productsByCategory: [],
  error: null
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProductsSuccess, (state, {products}) => ({
    ...state,
    products
  })),
  on(ProductsActions.loadProductsFailure, (state, {error}) => ({
    ...state,
    error
  })),


// Products by category
  on(ProductsActions.loadProductsByCategory, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.loadProductsByCategorySuccess, (state, {products}) => ({
    ...state,
    loading: false,
    productsByCategory: products,  // store only the current category products
  })),
  on(ProductsActions.loadProductsByCategoryFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  }))
);
