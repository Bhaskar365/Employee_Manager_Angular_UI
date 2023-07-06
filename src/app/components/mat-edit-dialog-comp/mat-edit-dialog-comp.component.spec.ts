import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditDialogCompComponent } from './mat-edit-dialog-comp.component';

describe('MatEditDialogCompComponent', () => {
  let component: MatEditDialogCompComponent;
  let fixture: ComponentFixture<MatEditDialogCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatEditDialogCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatEditDialogCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
