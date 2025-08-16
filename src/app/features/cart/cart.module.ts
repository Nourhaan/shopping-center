import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from './cart.component';
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatIconModule,
    TranslateModule
  ]
})
export class CartModule {
}
