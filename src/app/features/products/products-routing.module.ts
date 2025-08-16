import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ProductDetailResolver} from "../../core/resolvers/product-detail-resolver";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ProductsListComponent},
  {
    path: ':id', component: ProductDetailComponent,
    resolve: {
      product: ProductDetailResolver
    }
  },
  {path: 'category/:categoryName', component: ProductsListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
