import {createAction, props} from '@ngrx/store';
import {Product} from "../../core/models/products.model";

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);


export const loadProductsByCategory = createAction(
  '[Products] Load Products By Category',
  props<{ categoryId: string }>()
);

export const loadProductsByCategorySuccess = createAction(
  '[Products] Load Products By Category Success',
  props<{ categoryId: string; products: any[] }>()
);

export const loadProductsByCategoryFailure = createAction(
  '[Products] Load Products By Category Failure',
  props<{ categoryId: string; error: string }>()
);
