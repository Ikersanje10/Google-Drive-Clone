import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DriveItem } from '../../../../core/dashboard/dashboard.types';

@Component({
  imports: [DecimalPipe, DatePipe],
  selector: 'app-file-item',
  styleUrl: './file-item.component.scss',
  templateUrl: './file-item.component.html',
})
export class FileItemComponent {
  readonly file = input.required<DriveItem>();
}
