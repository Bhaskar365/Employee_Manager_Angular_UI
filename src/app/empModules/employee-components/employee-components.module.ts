import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeComponentsRoutingModule } from './employee-components-routing.module';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAddNewComponent } from './employee-add-new/employee-add-new.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [
    EmployeeEditComponent,
    EmployeeAddNewComponent,
    EmployeeDeleteComponent,
    EmployeeHomeComponent,
    EmployeeViewComponent,
    HeaderComponent,
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    EmployeeComponentsRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTooltipModule
  ]
})
export class EmployeeComponentsModule { }
