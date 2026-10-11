import { Component, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardSevice } from '../../../../core/dashboard/dashboard.sevice';
import { BreadcrumbService } from '../../../../core/dashboard/breadcrumb.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-create-folder-modal',
  styleUrl: './create-folder-modal.component.scss',
  templateUrl: './create-folder-modal.component.html',
})
export class CreateFolderModalComponent {

  private dashboardSevice = inject(DashboardSevice);
  private breadcrumbService = inject(BreadcrumbService);

  closeModal = output();

  folderName = new FormControl('', Validators.required);

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const parentFolderId = this.breadcrumbService.getCurrentFolderId();

    this.dashboardSevice.createFolder(this.folderName.value!, parentFolderId)
      .subscribe({
        next: () => this.closeModal.emit(),
      }
      )
  }
}
