import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedComponent } from './shared.component';

describe('SharedComponent', () => {
  let component: SharedComponent;
  let fixture: ComponentFixture<SharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
