import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
  @Input('isList') isList = false;
}
