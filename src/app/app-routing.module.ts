import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';

import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './access/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component:RegisterComponent },
  { path: '404', component:NotFoundComponent },
  { path:'', redirectTo: 'login' , pathMatch:'full'},
  { path: 'employee' ,
    canActivate:[AuthGuard],
    loadChildren:()=> 
    import('./empModules/employee-components/employee-components.module')
    .then(m=>m.EmployeeComponentsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
