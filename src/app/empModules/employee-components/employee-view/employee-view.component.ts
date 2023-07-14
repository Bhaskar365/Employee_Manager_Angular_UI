import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiServService } from 'src/app/services/api-serv.service';

type NewType = FormGroup;

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {

  x:any;

  constructor( private _dialogRef:MatDialogRef<EmployeeViewComponent>,
               @Inject(MAT_DIALOG_DATA) public data:any,
             ) {}

    ngOnInit(){
          this.x = this.data.id;
          // console.log(this.x);
    }

    closeFunc(){
        this._dialogRef.close();
    }
}
