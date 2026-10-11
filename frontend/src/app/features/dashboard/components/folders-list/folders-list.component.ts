import { Component, input } from '@angular/core';
import { DriveItem } from '../../../../core/dashboard/dashboard.types';
import { FolderItemComponent } from '../folder-item/folder-item.component';
import { AppEmptyState } from '../app-empty-state/app-empty-state';

@Component({
  imports: [FolderItemComponent, AppEmptyState],
  selector: 'app-folders-list',
  styleUrl: './folders-list.component.scss',
  templateUrl: './folders-list.component.html',
})
export class FoldersListComponent {

  readonly folderList = input<DriveItem[]>();
}
