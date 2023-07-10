import { Component , OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceService } from 'src/app/services/service.service';
import { catchError } from 'rxjs'; 
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mat-delete-dialog',
  templateUrl: './mat-delete-dialog.component.html',
  styleUrls: ['./mat-delete-dialog.component.scss']
})
export class MatDeleteDialogComponent implements OnInit {

  deleteData:any;

  constructor( private matDialog:MatDialogRef<MatDeleteDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data:any,
               private serv:ServiceService,
               private router:Router,
               private toast:NgToastService
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
