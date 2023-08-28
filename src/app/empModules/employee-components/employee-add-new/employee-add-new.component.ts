import { HttpClient } from '@angular/common/http';
import { Component, OnInit , Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { catchError } from 'rxjs';
import { ApiServService } from 'src/app/services/api-serv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-add-new',
  templateUrl: './employee-add-new.component.html',
  styleUrls: ['./employee-add-new.component.scss']
})
export class EmployeeAddNewComponent implements OnInit{

  modifiedAddJoiningDate:any;
  x:any;
  employeeData:any;

  addForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required,Validators.email]),
      Gender: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Phone : new FormControl('', [Validators.required]),
      JoiningDate : new FormControl('', [Validators.required]),
      // CreatedOn : new FormControl('', [Validators.required]),
  });

  constructor( private http:HttpClient,
               public dialogRef:MatDialogRef<EmployeeAddNewComponent>,
               @Inject (MAT_DIALOG_DATA) public data:any,
               private serv:ApiServService,
               private router:Router,
             ) {}

  ngOnInit() {
     
  }

  joiningDate(date1:any) {
    let x = date1._model.selection;
    let y = moment(x).format('YYYY-MM-DD');
    this.modifiedAddJoiningDate = y;
    console.log(y);
  }

  formSubmit(){
      
    this.x = this.addForm.value as string;
    
    this.serv.createNewEmployee(this.x).pipe(catchError((err)=>{
      alert(err);
      this.dialogRef.close();
      //sweetalert error notif
      Swal.fire({
        title: 'Create Unsuccessful',
        text: 'Error Creating New Employee!',
        icon: 'error',
        width:'800px',
        timer: 1500,
        timerProgressBar: true
      });
      return err;
    })).subscribe(res=> {
        this.dialogRef.close();
         //sweetalert success notif
         Swal.fire({
          title: 'Added Successfully',
          text: 'Adding New Employee Successfully ',
          icon: 'success',
          width:'800px',
          timer:1500,
          timerProgressBar:true,
      })
        this.router.navigate(['/homepage']);
        window.location.reload();    
      }); 
}


  get Name_Val() {
    return this.addForm.get('Name');
  }

  get Email_Val() {
    return this.addForm.get('Email');
  }

  get Gender_Val() {
    return this.addForm.get('Gender');
  }

  get Address_Val() {
    return this.addForm.get('Address');
  }

  get Phone_Val() {
    return this.addForm.get('Phone');
  }

  get JoiningDate_Val() {
    return this.addForm.get('JoiningDate');
  }

  // get CreatedOn_Val() {
  //   return this.addForm.get('CreatedOn');
  // }

  getNameErrorMessage(){
    return this.addForm.controls?.['Name'].hasError('required') ? 'Enter Name' : '';
  }

  getEmailErrorMessage(){
    if (this.addForm.controls?.['Email'].hasError('required')) {
      return 'Enter Email';
    }

    return this.addForm.controls?.['Email'].hasError('email') ? 'Not a valid email' : '';
  }

  getGenderErrorMessage(){
    return this.addForm.controls?.['Gender'].hasError('required') ? 'Enter gender' : '';
  }

  getAddressErrorMessage(){
    return this.addForm.controls?.['Address'].hasError('required') ? 'Enter address' : '';
  }

  getPhoneErrorMessage(){
    return this.addForm.controls?.['Phone'].hasError('required') ? 'Enter phone' : '';
  }

  getJoiningDateErrorMessage(){
    return this.addForm.controls?.['JoiningDate'].hasError('required') ? 'Enter joining date' : '';
  }

}
