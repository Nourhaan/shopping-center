import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpTimingInterceptor} from "./interceptors/http-timing.interceptor";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpTimingInterceptor, multi: true},
  ]
})
export class CoreModule {
}
