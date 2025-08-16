import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FavoritesRoutingModule} from './favorites-routing.module';
import {FavoritesComponent} from './favorites.component';
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    MatIconModule,
    TranslateModule
  ]
})
export class FavoritesModule {
}
