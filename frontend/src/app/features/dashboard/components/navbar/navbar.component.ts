import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../../../app.routes';
import { AuthService } from '../../../../core/auth/auth.service';
import { CreateMenuComponent } from '../create-menu/create-menu.component';

@Component({
  imports: [CreateMenuComponent],
  selector: 'app-navbar',
  styleUrl: './navbar.component.scss',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private route = inject(Router);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private createFolderTimer?: ReturnType<typeof setTimeout>;

  isNavbarOpen = input.required<boolean>();
  closeNavbar = output();
  createFolder = output();

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.createFolderTimer) {
        clearTimeout(this.createFolderTimer);
      }
    });
  }

  navToSection(e: Event) {
    const clickedButton = e.target as HTMLButtonElement;
    const previosCurrentButton = document.getElementsByClassName("current")[0];
    previosCurrentButton.classList.remove("current")
    clickedButton.classList.add("current");

    this.closeNavbar.emit();

    const page = clickedButton.id;
    this.route.navigate([`/dashboard`, page]);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        this.route.navigate(['signin']);
      }
    })
  }

  createFolderDispacher(): void {
    this.closeNavbar.emit();
    this.createFolderTimer = setTimeout(() => {
      this.createFolder.emit();
    }, 200);
  }

}
