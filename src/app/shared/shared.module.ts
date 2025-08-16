import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkeletonComponent} from './components/skeleton/skeleton.component';
import {SnackbarComponent} from './components/snackbar/snackbar.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    SkeletonComponent,
    SnackbarComponent
  ],
  exports: [
    SkeletonComponent, SnackbarComponent, MatSnackBarModule
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    MatSnackBarModule,
    TranslateModule
  ]
})
export class SharedModule {
}
