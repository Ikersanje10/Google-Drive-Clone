import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { LoginRequest, OtpRequest } from '../../../../core/auth/auth.types';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { LoginVerificationModalComponent } from "./login-verification-modal/login-verification-modal.component";

@Component({
  imports: [RouterLink, ReactiveFormsModule, MatProgressSpinner, LoginVerificationModalComponent],
  selector: 'app-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  loginError = signal(false);

  isLoading = signal(false);
  isVisible = signal(false);
  verificationEmail = signal('');
  otpStatus = signal<'idle' | 'blocked' | 'invalid' | 'success'>('idle');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.loginError.set(params.get('error') === 'true');
    })
  }

  login(e: Event): void {
    e.preventDefault()
    if (this.loginForm.invalid) return;
    this.isLoading.set(true);
    const payload: LoginRequest = this.loginForm.getRawValue();
    this.verificationEmail.set(payload.email);
    this.authService.login(payload).pipe(finalize(() => this.isLoading.set(false))).subscribe({
      next: () => {
        this.isVisible.set(true);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  verifyOtpCode(code: string): void {
    const payload: OtpRequest = { email: this.verificationEmail(), otpCode: code };
    this.otpStatus.set('idle');
    this.authService.verifyOtpCode(payload).subscribe({
      next: (res) => {
        if (res === 423) {
          this.otpStatus.set('blocked');
        }
        if (res === 401) {
          this.otpStatus.set('invalid');
        };
        if (res === 200) {
          this.isVisible.set(false);
          this.otpStatus.set('success');
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
      }
    })
  }

  resendOtpCode(): void {
    this.authService.resendOtpCode(this.verificationEmail()).subscribe({
      next: (res) => {
        if (res === 200) {
          this.otpStatus.set('idle');
        }
      },
      error: (err) => {

      }
    })
  }

  loginWithGoogle(): void {
    this.isLoading.set(true);
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  }

}

