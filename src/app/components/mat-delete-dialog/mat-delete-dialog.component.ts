import { Component , OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceService } from 'src/app/services/service.service';
import { catchError } from 'rxjs'; 
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

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
      this.toast.error({detail: 'Error deleting employee',summary: 'Delete not successful',duration:5000})
      return err;
    })).subscribe(res=>{
      console.log(res);
      this.toast.success({detail:'Employee Deleted',summary:'Delete Successful',duration:5000});
      window.location.reload();
      this.router.navigate(['/homepage']);
    })
  }

}
