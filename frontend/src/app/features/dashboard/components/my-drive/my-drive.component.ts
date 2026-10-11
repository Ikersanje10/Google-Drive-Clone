import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { DriveItem } from '../../../../core/dashboard/dashboard.types';
import { DashboardSevice } from '../../../../core/dashboard/dashboard.sevice';
import { RouterOutlet, RouterLinkWithHref, ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../../core/dashboard/breadcrumb.service';
import { platformBrowser } from '@angular/platform-browser';

@Component({
  imports: [RouterOutlet, RouterLinkWithHref],
  selector: 'app-my-drive',
  styleUrl: './my-drive.component.scss',
  templateUrl: './my-drive.component.html',
})
export class MyDriveComponent {

  breadcrumb = inject(BreadcrumbService);
  // filesList: WritableSignal<DriveItem[]> | undefined;
  // folderList: WritableSignal<DriveItem[]> | undefined;

  // constructor() {
  // this.readAllDriveItems();
  // }




  // public addFolder(folder: DriveItem): void {
  //   this.folderList!.update(list => [...list, folder]);
  // }

  //   this.dashboardService.getAllDriveItems().subscribe({
  //     error: (error: unknown) => {
  //       console.error('Unable to load drive items.', error);
  //     },
  //   });
  // }

  // private readAllDriveItems() {
  //   this.filesList = this.dashboardService.getAllFiles();
  //   this.folderList = this.dashboardService.getAllFolders();
  // }
}