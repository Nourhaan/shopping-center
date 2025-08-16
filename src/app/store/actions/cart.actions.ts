import {createAction, props} from '@ngrx/store';
import {Product} from "../../core/models/products.model";

export const addToCart = createAction(
  '[Cart] Add Product',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Product',
  props<{ productId: number }>()
);
