import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CategoriesActions from '../actions/categories.actions';
import {catchError, map, mergeMap, of, retry, takeUntil} from 'rxjs';
import {ProductsService} from "../../core/services/products.service";
import {UnsubscribeDirective} from "../../core/directives/unsubscribe.directive";

@Injectable()
export class CategoriesEffects extends UnsubscribeDirective {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      mergeMap(() =>
        this.productsService.getCategories().pipe(takeUntil(this.destroy$),
          retry(2),
          map(categories => CategoriesActions.loadCategoriesSuccess({categories})),
          catchError(error => of(CategoriesActions.loadCategoriesFailure({error})))
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
