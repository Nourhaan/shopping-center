import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, catchError, tap, throwError} from 'rxjs';
import {SharedService} from "../services/shared.service";

@Injectable()
export class HttpTimingInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const start = Date.now();
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - start;
          console.log(`Request to ${req.url} took ${elapsed} ms`);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error)
        this.sharedService.showSnackBar(error.message)
        return throwError(() => error);
      })
    );
  }
}
