import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDriveComponent } from './my-drive.component';

describe('MyDriveComponent', () => {
  let component: MyDriveComponent;
  let fixture: ComponentFixture<MyDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDriveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDriveComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
