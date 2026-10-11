import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppEmptyState } from './app-empty-state';

describe('AppEmptyState', () => {
  let component: AppEmptyState;
  let fixture: ComponentFixture<AppEmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEmptyState],
    }).compileComponents();

    fixture = TestBed.createComponent(AppEmptyState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
