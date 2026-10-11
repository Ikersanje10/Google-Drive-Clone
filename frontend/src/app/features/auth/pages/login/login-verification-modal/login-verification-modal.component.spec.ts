import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginVerificationModalComponent } from './login-verification-modal.component';

describe('LoginVerificationModalComponent', () => {
  let component: LoginVerificationModalComponent;
  let fixture: ComponentFixture<LoginVerificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginVerificationModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginVerificationModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
