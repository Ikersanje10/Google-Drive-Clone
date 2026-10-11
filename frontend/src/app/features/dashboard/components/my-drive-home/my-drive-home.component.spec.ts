import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDriveHomeComponent } from './my-drive-home.component';

describe('MyDriveHomeComponent', () => {
  let component: MyDriveHomeComponent;
  let fixture: ComponentFixture<MyDriveHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDriveHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDriveHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
