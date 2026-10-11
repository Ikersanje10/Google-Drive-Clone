import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { SignupRequest } from '../../../../core/auth/auth.types';
import { passwordMatchValidator } from '../../../../core/auth/password-match.validator';
import { SignupSuccessModalComponent } from "./signup-success-modal/signup-success-modal.component";

@Component({
  imports: [RouterLink, ReactiveFormsModule, SignupSuccessModalComponent],
  selector: 'app-signup',
  styleUrl: './signup.component.scss',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);
  private route = inject(Router)

  showSuccessModal = signal(false);

  signupForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: passwordMatchValidator('password', 'confirmPassword')
  });

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.signupForm.invalid) return;

    const { confirmPassword, ...payload } = this.signupForm.getRawValue();
    this.authService.createAccount(payload as SignupRequest).subscribe({
      next: (response) => {
        console.log(response);
        if (response === 201) this.showSuccessModal.set(true);
        if (response === 409) this.signupForm.get('email')?.setErrors({ emailTaken: true });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goToLogin(): void {
    this.showSuccessModal.set(false);
    this.route.navigate(['signin']);
  }

  hideSuccessModal(): void {
    this.showSuccessModal.set(false);
    this.signupForm.reset();
  }
}
