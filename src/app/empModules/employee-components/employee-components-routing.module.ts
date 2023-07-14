import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeAddNewComponent } from './employee-add-new/employee-add-new.component';

const routes: Routes = [

  { path: '', component:HeaderComponent,
    children:[
      { path : 'employee-home', component: EmployeeHomeComponent  },
      { path : 'add-new-employee', component: EmployeeAddNewComponent },
      { path: '', redirectTo: 'employee-home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeComponentsRoutingModule { }
