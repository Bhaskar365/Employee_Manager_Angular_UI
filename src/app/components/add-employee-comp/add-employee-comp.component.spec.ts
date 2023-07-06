import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeCompComponent } from './add-employee-comp.component';

describe('AddEmployeeCompComponent', () => {
  let component: AddEmployeeCompComponent;
  let fixture: ComponentFixture<AddEmployeeCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
