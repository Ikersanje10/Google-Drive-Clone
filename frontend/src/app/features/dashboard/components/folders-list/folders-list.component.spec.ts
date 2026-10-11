import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersListComponent } from './folders-list.component';

describe('FoldersListComponent', () => {
  let component: FoldersListComponent;
  let fixture: ComponentFixture<FoldersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
