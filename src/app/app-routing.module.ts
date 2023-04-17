import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { ResolveServService } from './resolve-serv.service';

const routes: Routes = [
  { path:'homepage', component:HomepageComponent },
  { path:'dialog/:id',component: DialogBodyComponent,resolve:{ id:ResolveServService }},
  { path:'', redirectTo: 'homepage' , pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
