import { DecimalPipe } from '@angular/common';
import { afterRenderEffect, AfterViewInit, Component, computed, effect, ElementRef, input, OnDestroy, OnInit, output, QueryList, signal, viewChildren, ViewChildren } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

type OtpStatus = 'idle' | 'blocked' | 'invalid' | 'success';

@Component({
  imports: [DecimalPipe, ReactiveFormsModule, MatProgressSpinner],
  selector: 'app-login-verification-modal',
  styleUrl: './login-verification-modal.component.scss',
  templateUrl: './login-verification-modal.component.html',
})
export class LoginVerificationModalComponent {

  email = input.required<string>();
  isVisible = input(true);
  verifyOtpCode = output<string>();
  resendOtpCode = output();
  resendEnabled = signal(false);
  secondsRemaining = signal<number>(60);
  isLoading = signal(false);
  otpStatus = input<OtpStatus>('idle');

  private interval: any;
  private fb = new FormBuilder();

  otpInputs = viewChildren<ElementRef<HTMLInputElement>>('otpInput');

  otpCodeForm = this.fb.group({
    firstNumber: ['', Validators.required],
    secondNumber: ['', Validators.required],
    thirdNumber: ['', Validators.required],
    fourNumber: ['', Validators.required],
    fiveNumber: ['', Validators.required],
    sixNumber: ['', Validators.required],
  })

  constructor() {
    effect((onCleanup) => {
      if (this.isVisible()) {
        this.secondsRemaining.set(60);
        this.resendEnabled.set(false);
        this.startCounting();
      }
      onCleanup(() => this.stopCounting());
    });

    afterRenderEffect(() => {
      if (this.isVisible()) {
        this.otpInputs()[0].nativeElement.focus();
      }
    })

    effect(() => {
      if (this.otpStatus() === "invalid") {
        this.otpCodeForm.reset();
      }
      this.isLoading.set(false);
    });
  }

  errorMessage = computed(() => {
    switch (this.otpStatus()) {
      case 'blocked':
        return 'You have entered the code incorrectly 3 times. Please try again later.';

      case 'invalid':
        return 'The code you entered is incorrect.';

      default:
        return null;
    }
  })

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.otpCodeForm.invalid) {
      return;
    };
    this.isLoading.set(true);
    let otpCode = Object.values(this.otpCodeForm.getRawValue()).join("");
    this.verifyOtpCode.emit(otpCode);
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 1);

    if (input.value) {
      this.otpInputs()[index + 1]?.nativeElement.focus();
    }
  }

  resendCode(): void {
    this.secondsRemaining.set(60);
    this.resendEnabled.set(false);
    this.startCounting();
    this.otpCodeForm.reset();
    this.resendOtpCode.emit();
  }

  private startCounting(): void {
    this.interval = setInterval(() => {
      this.secondsRemaining.update((value) => {
        if (value - 1 === 0) {
          this.stopCounting();
          return value;
        }
        return value - 1;
      })
    }, 1000);
  }

  private stopCounting(): void {
    this.resendEnabled.set(true);
    clearInterval(this.interval);
  }
}