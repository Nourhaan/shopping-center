import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppLayoutModule} from "./app-layout/app-layout.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpTimingInterceptor} from "./core/interceptors/http-timing.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CoreModule} from "./core/core.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {favoritesReducer} from "./store/reducers/favorites.reducer";
import {cartReducer} from "./store/reducers/cart.reducer";
import {categoriesReducer} from "./store/reducers/categories.reducer";
import {productsReducer} from "./store/reducers/products.reducer";
import {ProductsEffects} from "./store/effects/products.effects";
import {CategoriesEffects} from "./store/effects/categories.effects";
import {CartEffects} from "./store/effects/cart.effects";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

// Factory for translation loader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    StoreModule.forRoot({
        products: productsReducer,
        favorites: favoritesReducer,
        cart: cartReducer,
        categories: categoriesReducer
      },
    ),
    EffectsModule.forRoot([ProductsEffects, CategoriesEffects, CartEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
