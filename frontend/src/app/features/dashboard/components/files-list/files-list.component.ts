import { Component, input } from '@angular/core';
import { DriveItem } from '../../../../core/dashboard/dashboard.types';
import { FileItemComponent } from '../file-item/file-item.component';
import { AppEmptyState } from '../app-empty-state/app-empty-state';

@Component({
  imports: [FileItemComponent, AppEmptyState],
  selector: 'app-files-list',
  styleUrl: './files-list.component.scss',
  templateUrl: './files-list.component.html',
})
export class FilesListComponent {
  filesList = input<DriveItem[]>();
}
