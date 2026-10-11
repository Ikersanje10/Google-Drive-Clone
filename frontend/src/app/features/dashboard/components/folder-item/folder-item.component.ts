import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { DriveItem } from '../../../../core/dashboard/dashboard.types';

@Component({
  selector: 'app-folder-item',
  styleUrl: './folder-item.component.scss',
  templateUrl: './folder-item.component.html',
})
export class FolderItemComponent {
  readonly folder = input.required<DriveItem>();
  private readonly router = inject(Router);

  openFolder(): void {
    this.router.navigate(['/dashboard/myDrive/folder', this.folder().id]);
  }
}
