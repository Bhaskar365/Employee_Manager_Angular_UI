import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeComponentsRoutingModule } from './employee-components-routing.module';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAddNewComponent } from './employee-add-new/employee-add-new.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

@NgModule({
  declarations: [
    EmployeeEditComponent,
    EmployeeAddNewComponent,
    EmployeeDeleteComponent,
    EmployeeHomeComponent,
    EmployeeViewComponent,
  ],
  imports: [
    CommonModule,
    EmployeeComponentsRoutingModule
  ]
})
export class EmployeeComponentsModule { }
