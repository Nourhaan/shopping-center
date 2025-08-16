import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductsFilterComponent} from './products-filter/products-filter.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductsFilterComponent,
    ProductsListComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    SharedModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    InfiniteScrollModule,
    TranslateModule
  ]
})
export class ProductsModule {
}
