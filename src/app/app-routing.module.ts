import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)},
  {path: 'favorites', loadChildren: () => import('./features/favorites/favorites.module').then(m => m.FavoritesModule)},
  {path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
