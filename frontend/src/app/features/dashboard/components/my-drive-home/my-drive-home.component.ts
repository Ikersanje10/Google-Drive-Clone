import { Component, inject, Signal } from '@angular/core';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FilesListComponent } from '../files-list/files-list.component';
import { DriveItem } from '../../../../core/dashboard/dashboard.types';
import { DashboardSevice } from '../../../../core/dashboard/dashboard.sevice';
import { BreadcrumbService } from '../../../../core/dashboard/breadcrumb.service';

@Component({
  imports: [FoldersListComponent, FilesListComponent],
  selector: 'app-my-drive-home',
  styleUrl: './my-drive-home.component.scss',
  templateUrl: './my-drive-home.component.html',
})
export class MyDriveHomeComponent {

  private dashboardService = inject(DashboardSevice);
  private breadcrumbService = inject(BreadcrumbService);

  filesList: Signal<DriveItem[]> | undefined;
  folderList: Signal<DriveItem[]> | undefined;

  constructor() {
    this.readAllDriveItems();
  }

  ngOnInit(): void {
    this.breadcrumbService.reset();

    this.dashboardService.getRootDriveItems().subscribe({
      error: (error: unknown) => {
        console.error('Unable to load drive items.', error);
      },
    });
  }

  private readAllDriveItems() {
    this.filesList = this.dashboardService.getAllFiles();
    this.folderList = this.dashboardService.getAllFolders();
  }
}
