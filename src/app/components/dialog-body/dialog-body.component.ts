import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  addNewEmpForm = new FormGroup({
    recruitment_date : new FormControl('',[Validators.required]),
    name : new FormControl('', [Validators.required]),
    username : new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone : new FormControl('', [Validators.required]),
    street : new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required])
  })

  constructor(private router:ActivatedRoute,
              private fb:FormBuilder,
              public serv:ServiceService,
              private _dialogRef:MatDialogRef<DialogBodyComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any
              ) 
{
    this.empForm = this.fb.group({
      joining_date:'',
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


  get JoiningDate(){
    return this.addNewEmpForm.get('joining_date');
  }

  get Name(){
    return this.addNewEmpForm.get('name');
  }

  get Username(){
    return this.addNewEmpForm.get('username');
  }

  get Email(){
    return this.addNewEmpForm.get('email');
  }

  get Phone(){
    return this.addNewEmpForm.get('phone');
  }

  get Street(){
    return this.addNewEmpForm.get('street');
  }

  get City(){
    return this.addNewEmpForm.get('city');
  }



  onFormSubmit(){
    // if(this.empForm.valid){
    //   if(this.data){
    //     this.serv.updateEmployees(this.data.id,this.empForm.value).subscribe({
    //       next:(res:any)=>{
    //         this._dialogRef.close();
    //       },
    //       error:(err:any)=>{
    //         console.log(err);
    //       },
    //     });
    //   }
    //   else{
    //     this.serv.addEmployees(this.empForm.value).subscribe({
    //       next:(res:any)=>{
    //         this._dialogRef.close(true);
    //       },
    //       error:(err:any)=>{
    //         console.log(err);
    //       }
    //     })
    //   }
    // }
  }
}
