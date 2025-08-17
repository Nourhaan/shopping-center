import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ProductsActions from '../actions/products.actions';
import {catchError, map, mergeMap, of, retry, takeUntil} from 'rxjs';
import {ProductsService} from "../../core/services/products.service";
import {UnsubscribeDirective} from "../../core/directives/unsubscribe.directive";

@Injectable()
export class ProductsEffects extends UnsubscribeDirective {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.productsService.getProducts().pipe(
          retry(2), // retry twice before failing
          map(products => ProductsActions.loadProductsSuccess({products})),
          catchError(error => of(ProductsActions.loadProductsFailure({error})))
        )
      )
    )
  );

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductsByCategory),
      mergeMap(({categoryId}) =>
        this.productsService.getProductsByCategory(categoryId).pipe(takeUntil(this.destroy$),
          map((products) =>
            ProductsActions.loadProductsByCategorySuccess({categoryId, products})
          ),
          catchError((error) =>
            of(ProductsActions.loadProductsByCategoryFailure({categoryId, error: error.message}))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {
    super();
  }
}
