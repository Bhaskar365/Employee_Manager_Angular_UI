import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiServService } from 'src/app/services/api-serv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss']
})
export class EmployeeDeleteComponent implements OnInit {

  deleteData:any;

  constructor( private matDialog:MatDialogRef<EmployeeDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data:any,
               private serv:ApiServService,
               private router:Router,
             ) { }

  ngOnInit(){

    this.deleteData = this.data.value;
  }

  deleteEmployee(x:any)
  {
    this.serv.deleteEmployeeById(x).pipe(catchError((err)=>{
      Swal.fire({
        title: 'Delete Unsuccessful',
        text: 'Error Deleting Employee!',
        icon: 'error',
        width:'800px',
        timer: 1500,
        timerProgressBar: true
      });
      return err;
    })).subscribe(res=>{
      console.log(res);
      Swal.fire({
        title: 'Delete Successfully',
        text: 'Deleting Employee Successfully ',
        icon: 'success',
        width:'800px',
        timer:1500,
        timerProgressBar:true,
    })
      window.location.reload();
      this.router.navigate(['/homepage']);
    })
  }

}