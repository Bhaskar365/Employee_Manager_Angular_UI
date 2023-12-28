import { Component, OnInit, Inject } from '@angular/core';
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
export class EmployeeAddNewComponent implements OnInit {

  modifiedAddJoiningDate: any;

  departmentList: any = [];
  departmentID: any = [];
  departmentName: any = [];

  selectDeptValue!: string;

  x: any;
  employeeData: any;

  addForm = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Gender: new FormControl('', [Validators.required]),
    City: new FormControl('', [Validators.required]),
    State: new FormControl('', [Validators.required]),
    Country: new FormControl('', [Validators.required]),
    ZipCode: new FormControl('', [Validators.required]),
    Phone: new FormControl('', [Validators.required]),
    DepartmentId: new FormControl('', [Validators.required]),
    Position: new FormControl('', [Validators.required]),
    DateOfHire: new FormControl('', [Validators.required]),
    CTC: new FormControl('', [Validators.required]),
    UserImage: new FormControl('', [Validators.required]),
    _Department: new FormGroup({
      DepartmentId: new FormControl('', [Validators.required]),
      DepartmentName: new FormControl('', [Validators.required]),
    }),

  });

  constructor(public dialogRef: MatDialogRef<EmployeeAddNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serv: ApiServService,
    private router:Router
  ) { }

  ngOnInit() {
    this.serv.getAllDepartments().subscribe((dep: any) => {

      for (var i = 0; i < dep.length; i++) {
        this.departmentList.push(dep[i]);
        this.departmentID.push(dep[i].departmentId);
        this.departmentName.push(dep[i].departmentName)
      }
    });

    // Listen for changes in the DepartmentName control
    this.addForm.get('_Department.DepartmentName')?.valueChanges.subscribe((selectedDepartmentName: any) => {
      // Find the corresponding DepartmentId based on the selected department name
      const selectedDepartment = this.departmentList.find((dep: any) => dep.DepartmentName === selectedDepartmentName);

      // Update the DepartmentId control in the form
      if (selectedDepartment) {
        this.addForm.patchValue({
          DepartmentId: selectedDepartment.DepartmentId,
        });
      }
    });

    this.addForm.get('DepartmentId')?.valueChanges.subscribe((selectedDepartmentId: any) => {
      // Find the corresponding DepartmentName based on the selected department id
      const selectedDepartment = this.departmentList.find((dep: any) => dep.departmentId === selectedDepartmentId);
    
      // Update the _Department FormGroup in the form
      if (selectedDepartment) {
        this.addForm.patchValue({
          _Department: {
            DepartmentId: selectedDepartment.departmentId,
            DepartmentName: selectedDepartment.departmentName,
          }
        });
      }
    });
  }

  joiningDate(date1: any) {
    let x = date1._model.selection;
    let y = moment(x).format('YYYY-MM-DD');
    this.modifiedAddJoiningDate = y;
    console.log(y);
  }

  closeWindow() {
    this.dialogRef.close();
  }

  formSubmit() {

    this.x = this.addForm.value as string;

    console.log(this.x)
    console.log('Form validity:', this.addForm.valid);

    // this.serv.createNewEmployee(this.x).pipe(catchError((err)=>{
    //   console.log(err);
    //   // this.dialogRef.close();
    //   //sweetalert error notif
    //   // Swal.fire({
    //   //   title: 'Create Unsuccessful',
    //   //   text: 'Error Creating New Employee!',
    //   //   icon: 'error',
    //   //   width:'800px',
    //   //   timer: 1500,
    //   //   timerProgressBar: true
    //   // });
    //   return err;
    // })).subscribe(res=> {
    //   //   this.dialogRef.close();
    //   //    //sweetalert success notif
    //   //    Swal.fire({
    //   //     title: 'Added Successfully',
    //   //     text: 'Adding New Employee Successfully ',
    //   //     icon: 'success',
    //   //     width:'800px',
    //   //     timer:1500,
    //   //     timerProgressBar:true,
    //   // })
    //     this.router.navigate(['/homepage']);
    //     // window.location.reload();    
    //   }); 
  }

  get FirstName_Val() {
    return this.addForm.get('FirstName');
  }

  get LastName_Val() {
    return this.addForm.get('LastName');
  }

  get Email_Val() {
    return this.addForm.get('Email');
  }

  get Gender_Val() {
    return this.addForm.get('Gender');
  }

  get City_Val() {
    return this.addForm.get('City');
  }

  get State_Val() {
    return this.addForm.get('State');
  }

  get Country_Val() {
    return this.addForm.get('Country');
  }

  get ZipCode_Val() {
    return this.addForm.get('ZipCode');
  }

  get Phone_Val() {
    return this.addForm.get('Phone');
  }

  get DepartmentId_Val() {
    return this.addForm.get('DepartmentId');
  }

  get Position_Val() {
    return this.addForm.get('Position');
  }

  get DateOfHire_Val() {
    return this.addForm.get('JoiningDate');
  }

  get CTC_Val() {
    return this.addForm.get('CTC');
  }

  get UserImage_Val() {
    return this.addForm.get('UserImage');
  }


  getFirstNameErrorMessage() {
    return this.addForm.controls?.['FirstName'].hasError('required') ? 'Enter First Name' : '';
  }

  getLastNameErrorMessage() {
    return this.addForm.controls?.['LastName'].hasError('required') ? 'Enter Last Name' : '';
  }

  getEmailErrorMessage() {
    if (this.addForm.controls?.['Email'].hasError('required')) {
      return 'Enter Email';
    }
    return this.addForm.controls?.['Email'].hasError('email') ? 'Not a valid email' : '';
  }

  getGenderErrorMessage() {
    return this.addForm.controls?.['Gender'].hasError('required') ? 'Enter gender' : '';
  }

  getCityErrorMessage() {
    return this.addForm.controls?.['City'].hasError('required') ? 'Enter City' : '';
  }

  getStateErrorMessage() {
    return this.addForm.controls?.['State'].hasError('required') ? 'Enter State' : '';
  }

  getCountryErrorMessage() {
    return this.addForm.controls?.['Country'].hasError('required') ? 'Enter Country' : '';
  }

  getZipCodeErrorMessage() {
    return this.addForm.controls?.['ZipCode'].hasError('required') ? 'Enter ZipCode' : '';
  }

  getPhoneErrorMessage() {
    return this.addForm.controls?.['Phone'].hasError('required') ? 'Enter phone' : '';
  }

  getDepartmentErrorMessage() {
    return this.addForm.controls?.['DepartmentId'].hasError('required') ? 'Enter Department' : '';
  }

  getPositionErrorMessage() {
    return this.addForm.controls?.['Position'].hasError('required') ? 'Enter Position' : '';
  }

  getJoiningDateErrorMessage() {
    return this.addForm.controls?.['DateOfHire'].hasError('required') ? 'Enter joining date' : '';
  }

  getCTCErrorMessage() {
    return this.addForm.controls?.['CTC'].hasError('required') ? 'Enter CTC' : '';
  }

  getUserImageErrorMessage() {
    return this.addForm.controls?.['UserImage'].hasError('required') ? 'Select Image' : '';
  }

}
