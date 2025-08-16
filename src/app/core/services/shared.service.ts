import {Injectable, Injector} from '@angular/core';
import {SnackbarComponent} from "../../shared/components/snackbar/snackbar.component";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor(private injector: Injector) {
  }

  snackBar = this.injector.get(MatSnackBar);

  trackByIndex(index: number) {
    return index;
  }

  closeDrawer() {
    document.querySelectorAll('.offcanvas-backdrop').forEach(el => el.remove());
    document.body.classList.remove('offcanvas-backdrop', 'show');
    document.body.style.overflow = ''; // reset body scroll if locked
    document.getElementsByTagName('body')[0].removeAttribute("style"); // enable scroll again
  }

  showSnackBar(message: string, horizontalPosition: MatSnackBarHorizontalPosition = 'end', duration = 3000) {
    this.snackBar.openFromComponent(SnackbarComponent,
      {
        duration: duration,
        horizontalPosition: horizontalPosition,
        data: {
          message: message, preClose: () => {
            this.snackBar.dismiss()
          }
        }
      });
  }
}
