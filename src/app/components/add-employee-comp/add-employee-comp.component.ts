import { Component, OnInit , Inject } from '@angular/core';
import { FormGroup , Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import { ServiceService } from 'src/app/services/service.service';
import { CreateEmp } from '../models/models';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee-comp',
  templateUrl: './add-employee-comp.component.html',
  styleUrls: ['./add-employee-comp.component.scss']
})
export class AddEmployeeCompComponent implements OnInit{

  // modifiedDate1 : any;
  modifiedAddJoiningDate:any;
  modifiedAddCreatedDate : any;
  // modifiedDate2: any;
  x:any;
  employeeData:any;

  addForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required,Validators.email]),
      Gender: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Phone : new FormControl('', [Validators.required]),
      JoiningDate : new FormControl('', [Validators.required]),
      CreatedOn : new FormControl('', [Validators.required]),
  });

  constructor( private http:HttpClient,
               public dialogRef:MatDialogRef<AddEmployeeCompComponent>,
               @Inject (MAT_DIALOG_DATA) public data:any,
               private serv:ServiceService,
               private router:Router,
               private toast:NgToastService
             ) {}

  ngOnInit() {
     
  }

  joiningDate(date1:any) {
    let x = date1._model.selection;
    let y = moment(x).format('YYYY-MM-DD');
    this.modifiedAddJoiningDate = y;
    console.log(y);
  }

  createdDate(date2:any) {
    let x1 = date2._model.selection;
    let y1 = moment(x1).format('YYYY-MM-DD');
    this.modifiedAddCreatedDate = y1;
    console.log(y1);
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

  get CreatedOn_Val() {
    return this.addForm.get('CreatedOn');
  }
}
