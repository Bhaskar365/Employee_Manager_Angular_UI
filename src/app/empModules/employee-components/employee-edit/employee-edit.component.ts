import { Component, OnInit , Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiServService } from 'src/app/services/api-serv.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  editId: any;
  modifiedEditedJoiningDate: any;
  modifiedEditedCreatedDate: any;

  editForm = new FormGroup({
    userID: new FormControl(),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    joiningDate: new FormControl('', [Validators.required]),
    // createdOn: new FormControl('', [Validators.required]),
  })


  constructor(private dialog: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serv: ApiServService,
    private route: Router
  ) { }

  ngOnInit() {
    this.editForm.patchValue(this.data.value);
  }

  editFormSubmit() {
    this.serv.updateEmployees(this.editForm.value.userID, this.editForm.value)
      .pipe(catchError((err) => {
        Swal.fire({
          title: 'Edit Unsuccessful',
          text: 'Error Editing Employee!',
          icon: 'error',
          width: '800px',
          timer: 1500,
          timerProgressBar: true
        });
        return err;
      })).subscribe((res: any) => {
        Swal.fire({
          title: 'Edit Successfully',
          text: 'Editing Employee Successfully',
          icon: 'success',
          width:'800px',
          timer:1500,
          timerProgressBar:true,
      })
        window.location.reload();
        this.route.navigate(['/homepage']);
      })
  }

  get userID_Func() {
    return this.editForm.get('userID');
  }


  get Name_Func() {
    return this.editForm.get('name');
  }

  get Email_Func() {
    return this.editForm.get('email');
  }

  get Gender_Func() {
    return this.editForm.get('gender');
  }

  get Address_Func() {
    return this.editForm.get('address');
  }

  get Phone_Func() {
    return this.editForm.get('phone');
  }

  get JoiningDate_Func() {
    return this.editForm.get('joiningDate');
  }

  // get CreatedOn_Func() {
  //   return this.editForm.get('createdOn');
  // }

  joiningDate(date1: any) {
    let x = date1._model.selection;
    let y = moment(x).format('YYYY-MM-DD');
    this.modifiedEditedJoiningDate = y;
    console.log(y);
  }

  // createdDate(date2: any) {
  //   let x1 = date2._model.selection;
  //   let y1 = moment(x1).format('YYYY-MM-DD');
  //   this.modifiedEditedCreatedDate = y1;
  //   console.log(y1);
  // }

}
