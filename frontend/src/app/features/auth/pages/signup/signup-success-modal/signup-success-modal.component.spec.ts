import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupSuccessModalComponent } from './signup-success-modal.component';

describe('SignupSuccessModalComponent', () => {
  let component: SignupSuccessModalComponent;
  let fixture: ComponentFixture<SignupSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupSuccessModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupSuccessModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
