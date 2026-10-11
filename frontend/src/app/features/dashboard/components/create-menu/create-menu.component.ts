import { Component, effect, inject, input, output, signal } from '@angular/core';
import { DashboardSevice } from '../../../../core/dashboard/dashboard.sevice';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrl: './create-menu.component.scss',
  host: {
    '(document:keydown.escape)': 'close()',
  },
})
export class CreateMenuComponent {
  readonly isNavbarOpen = input.required<boolean>();
  protected readonly isOpen = signal(false);
  readonly createFolder = output<void>();

  private dashboardSevice = inject(DashboardSevice);

  constructor() {
    effect(() => {
      if (!this.isNavbarOpen()) {
        this.close();
      }
    });
  }

  toggle(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  close(): void {
    this.isOpen.set(false);
  }

  onUploadFile(event: Event): void {
    let inputElement = event.target as HTMLInputElement;
    let selectedFile = inputElement.files![0];

    this.dashboardSevice.uploadFile(selectedFile)

    this.close;
  }

  onCreateFolder(): void {
    this.createFolder.emit();
    this.close();
  }
}
