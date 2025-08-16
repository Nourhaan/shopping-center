import {inject} from '@angular/core';
import {ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

export const ProductDetailResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  //  the logic to be checked before navigation to product details screen
  console.log('check in resolver');
  return true;
};
