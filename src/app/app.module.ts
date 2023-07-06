import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';
import { NotFoundComponent } from './access/not-found/not-found.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewComponentComponent } from './components/view-component/view-component.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatViewDialogBoxComponent } from './components/mat-view-dialog-box/mat-view-dialog-box.component';
import { AddEmployeeCompComponent } from './components/add-employee-comp/add-employee-comp.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatEditDialogCompComponent } from './components/mat-edit-dialog-comp/mat-edit-dialog-comp.component';
import { MatDeleteDialogComponent } from './components/mat-delete-dialog/mat-delete-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DialogBodyComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    EditPageComponent,
    ViewComponentComponent,
    MatViewDialogBoxComponent,
    AddEmployeeCompComponent,
    MatEditDialogCompComponent,
    MatDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
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
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
