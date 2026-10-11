import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderComponent } from './folder.component';

describe('FolderComponent', () => {
  let component: FolderComponent;
  let fixture: ComponentFixture<FolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
