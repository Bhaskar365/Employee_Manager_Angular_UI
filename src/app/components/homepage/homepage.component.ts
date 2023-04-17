import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userFirstNameControl = new FormControl('', [Validators.required]);
  userLastNameControl = new FormControl('', [Validators.required]);
  
  
  data1:any;
  filteredData:any[]=[];
  filterBy:any;
  constructor(private serv:ServiceService,
              private matDialog:MatDialog,
              private router:Router,
              ) { }

  ngOnInit(){
      this.serv.getValues().subscribe((res:any)=>{
        this.data1 = res; 
        this.filteredData = [...this.data1];
         console.log(this.filteredData);
      })
  }

  //Filter Code
    filter() {
      this.filteredData = [...this.data1.filter((user:any) => user.name.toLowerCase().includes(this.filterBy))];
      }
  
      openDialog(id:any){
        console.log(456)
        this.matDialog.open(DialogBodyComponent,{
          width:'500px',
          height:'500px',
        }),
        this.router.navigateByUrl('dialog/{id}');
      

      }

}
