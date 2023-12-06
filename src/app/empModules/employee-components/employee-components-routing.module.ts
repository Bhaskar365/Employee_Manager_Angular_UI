import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeAddNewComponent } from './employee-add-new/employee-add-new.component';
import { ProfileComponent } from './profile/profile.component';
import { DepartmentComponent } from '../Departments/department/department.component';
import { NotFoundComponent } from 'src/app/access/not-found/not-found.component';

const routes: Routes = [

  { path: '', component:HeaderComponent,
    children:[
      { path: '', redirectTo: 'employee-home', pathMatch: 'full' },
      { path : 'employee-home', component: EmployeeHomeComponent  },
      { path : 'add-new-employee', component: EmployeeAddNewComponent },
      { path : 'user-profile', component:ProfileComponent },
      { path: 'department' , component:DepartmentComponent },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeComponentsRoutingModule { }
