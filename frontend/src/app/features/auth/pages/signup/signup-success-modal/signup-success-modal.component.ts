import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-signup-success-modal',
  styleUrl: './signup-success-modal.component.scss',
  templateUrl: './signup-success-modal.component.html',
})
export class SignupSuccessModalComponent {
  visible = input(false);
  goToLogin = output();
  createAnotherAccount = output();
}
