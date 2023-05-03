import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { ResolveServService } from './resolve-serv.service';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';

const routes: Routes = [
  { path:'homepage', component:HomepageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component:RegisterComponent },
  { path:'', redirectTo: 'homepage' , pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
