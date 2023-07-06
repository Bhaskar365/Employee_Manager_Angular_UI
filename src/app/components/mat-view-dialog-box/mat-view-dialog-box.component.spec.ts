import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatViewDialogBoxComponent } from './mat-view-dialog-box.component';

describe('MatViewDialogBoxComponent', () => {
  let component: MatViewDialogBoxComponent;
  let fixture: ComponentFixture<MatViewDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatViewDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatViewDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
