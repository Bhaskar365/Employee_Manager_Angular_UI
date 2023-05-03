import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit{

empForm:FormGroup;

constructor(private serv:ServiceService,  
            private router:ActivatedRoute,
            private fb:FormBuilder,
            private _dialogRef:MatDialogRef<EditPageComponent>,
            @Inject(MAT_DIALOG_DATA) public data:any) 
{
  this.empForm = this.fb.group({
    website:'',
    name:'',
    username:'',
    email:'',
    phone:''
  })
}

ngOnInit(): void {
  this.empForm.patchValue(this.data);
  console.log(this.empForm.patchValue(this.data));
}

}
