import {productsReducer, ProductsState} from "./reducers/products.reducer";
import {categoriesReducer, CategoriesState} from "./reducers/categories.reducer";
import {cartReducer, CartState} from "./reducers/cart.reducer";
import {favoritesReducer, FavoritesState} from "./reducers/favorites.reducer";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  products: ProductsState;
  categories: CategoriesState;
  cart: CartState;
  favorites: FavoritesState;
}

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  favorites: favoritesReducer
};
