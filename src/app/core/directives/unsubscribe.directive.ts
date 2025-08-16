import {Directive, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Directive()
export abstract class UnsubscribeDirective implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
