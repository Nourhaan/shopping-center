import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CartActions from '../actions/cart.actions';
import {tap} from 'rxjs';

@Injectable()
export class CartEffects {
  persistCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.addToCart, CartActions.removeFromCart),
        tap(action => {
          const state = JSON.parse(localStorage.getItem('cart') || '[]');
          let updated = state;

          if (action.type === CartActions.addToCart.type) {
            updated = [...state, action.product];
          } else if (action.type === CartActions.removeFromCart.type) {
            updated = state.filter((item: any) => item.id !== action.productId);
          }

          localStorage.setItem('cart', JSON.stringify(updated));
        })
      ),
    {dispatch: false}
  );

  constructor(private actions$: Actions) {
  }
}
