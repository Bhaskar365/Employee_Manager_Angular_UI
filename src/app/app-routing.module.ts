import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { ResolveServService } from './resolve-serv.service';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';
import { AddEmployeeCompComponent } from './components/add-employee-comp/add-employee-comp.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './access/not-found/not-found.component';

const routes: Routes = [
  // { path:'homepage', component:HomepageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component:RegisterComponent },
  { path: '404', component:NotFoundComponent },
  // { path: 'addEmployee', component: AddEmployeeCompComponent},
  { path:'', redirectTo: 'login' , pathMatch:'full'},
  { path: 'employee' ,
    canActivate:[AuthGuard],
    loadChildren:()=> 
    import('./empModules/employee-components/employee-components.module')
    .then(m=>m.EmployeeComponentsModule)
  },
  { path: '404', component:ErrorPageComponent },
  // { path:'', redirectTo: 'homepage' , pathMatch:'full'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
