import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CreateFolderModalComponent } from '../components/create-folder-modal/create-folder-modal.component';


@Component({
  imports: [NavbarComponent, RouterOutlet, CreateFolderModalComponent],
  selector: 'app-dashboard-layout',
  styleUrl: './dashboard-layout.component.scss',
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {

  isNavbarOpen = signal<boolean>(false);
  createFolderSignal = signal(false);

  toggleNavbar(): void {
    this.isNavbarOpen.update(value => !value)
  }

  openCreateFolder(): void {
    this.createFolderSignal.set(true);
  }

  closeCreateFolder(): void {
    this.createFolderSignal.set(false);
  }
} 
