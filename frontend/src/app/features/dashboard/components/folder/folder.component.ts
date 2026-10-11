import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../../core/dashboard/breadcrumb.service';
import { DashboardSevice } from '../../../../core/dashboard/dashboard.sevice';
import { DriveItem } from '../../../../core/dashboard/dashboard.types';
import { FolderService } from './folder.service';
import { FileItemComponent } from '../file-item/file-item.component';
import { FolderItemComponent } from '../folder-item/folder-item.component';
import { AppEmptyState } from '../app-empty-state/app-empty-state';

@Component({
  imports: [FileItemComponent, FolderItemComponent, AppEmptyState],
  selector: 'app-folder',
  styleUrl: './folder.component.scss',
  templateUrl: './folder.component.html',
})
export class FolderComponent implements OnInit {

  private breadcrumbService = inject(BreadcrumbService);
  private dashboardSevice = inject(DashboardSevice);
  private folderService = inject(FolderService);
  private route = inject(ActivatedRoute);
  folderContent = computed(() => this.dashboardSevice.folders());

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const folderId = params.get("folderId");

      if (folderId) {
        const folder = this.dashboardSevice.getFolderById(folderId);
        this.breadcrumbService.addFolder(folderId, folder!.name);
        this.dashboardSevice.getFolderContent(folder!).subscribe({
          error: error => console.error("Unable to load folder contents.", error),
        });
      }
    })
  }

}
