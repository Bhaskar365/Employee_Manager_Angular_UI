import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  empForm:FormGroup;

  constructor(private router:ActivatedRoute,
              private fb:FormBuilder,
              public serv:ServiceService,
              private _dialogRef:MatDialogRef<DialogBodyComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any
              ) 
{
    this.empForm = this.fb.group({
      website:'',
      name:'',
      username:'',
      email:'',
      phone:'',
      street:'',
      city:''
    })
}

  x:any;
  dataById:any;

  ngOnInit()
  {
    this.empForm.patchValue(this.data);
    console.log(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this.serv.updateEmployees(this.data.id,this.empForm.value).subscribe({
          next:(res:any)=>{
            this._dialogRef.close();
          },
          error:(err:any)=>{
            console.log(err);
          },
        });
      }
      else{
        this.serv.addEmployees(this.empForm.value).subscribe({
          next:(res:any)=>{
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
            console.log(err);
          }
        })
      }
    }
  }
}