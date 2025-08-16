import {createReducer, on} from '@ngrx/store';
import * as CategoriesActions from '../actions/categories.actions';

export interface CategoriesState {
  categories: string[];
  error: any;
}

export const initialState: CategoriesState = {
  categories: [],
  error: null
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.loadCategoriesSuccess, (state, {categories}) => ({
    ...state,
    categories
  })),
  on(CategoriesActions.loadCategoriesFailure, (state, {error}) => ({
    ...state,
    error
  }))
);
