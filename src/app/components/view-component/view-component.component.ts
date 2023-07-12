import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.scss']
})
export class ViewComponentComponent implements OnInit{

 viewForm:FormGroup;

  constructor(private router:ActivatedRoute,
              private fb:FormBuilder,
              public serv:ServiceService,
              private _dialogRef:MatDialogRef<ViewComponentComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              ) 
{
    this.viewForm = this.fb.group({
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
  y:any;


  
  ngOnInit()
  {
    this.viewForm.patchValue(this.data);
    console.log(555);
 
  }

  onFormSubmit(){
    // if(this.viewForm.valid){
    //   if(this.data){
    //     this.serv.updateEmployees(this.data.id,this.viewForm.value).subscribe({
    //       next:(res:any)=>{
    //         this._dialogRef.close();
    //       },
    //       error:(err:any)=>{
    //         console.log(err);
    //       },
    //     });
    //   }
    //   else{
    //     this.serv.addEmployees(this.viewForm.value).subscribe({
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
