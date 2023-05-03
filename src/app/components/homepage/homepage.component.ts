import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { ViewComponentComponent } from '../view-component/view-component.component';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  obs$:BehaviorSubject<any> = new BehaviorSubject<any>('');

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userFirstNameControl = new FormControl('', [Validators.required]);
  userLastNameControl = new FormControl('', [Validators.required]);
  
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  data1:any;
  filteredData:any[]=[];
  filterBy:any;
  constructor(private serv:ServiceService,
              private matDialog:MatDialog,
              private router:Router,
              ) { }

  ngOnInit(){
      this.getEmployeeList();
  }

  //Filter Code
    filter() {
      this.filteredData = [...this.data1.filter((user:any) => user.name.toLowerCase().includes(this.filterBy))];
      }

      //ADD NEW EMPLOYEE
      addNewEmployee(){
        const dialogRef = this.matDialog.open(DialogBodyComponent);
        dialogRef.afterClosed().subscribe({
          next:(val) =>{
            console.log(val)
            if(val){
              this.getEmployeeList();
            }
          }
        })
      }

     //GET EMPLOYEE
      getEmployeeList(){
        this.serv.getEmployees().subscribe((res:any)=>{
          this.data1 = res; 
          console.log(res);
          this.filteredData = [...this.data1];
          this.data1.paginator = this.paginator;
        })
      }

      //EDIT EMPLOYEE
       editBoxDialog(data:any){
        const dialogRef = this.matDialog.open(DialogBodyComponent,{
          data,
          width:'550px',
          height:'550px',
        });

        dialogRef.afterClosed().subscribe({
          next:(val)=>{
                
            if(val)
            {
              this.getEmployeeList();
            }
          }
        })
      }

      //DELETE EMPLOYEE
      deleteEmployees(id:number){
          this.serv.deleteEmployees(id).subscribe({
            next:(res)=>{
              this.getEmployeeList();
            },
            error:(err:any)=>{
              console.log(err)
            }
          })
      }
      
      //VIEW DETAILS
      viewEmployeeDetails(id:any){
         const dialogRef = this.matDialog.open(ViewComponentComponent,{
          id,
          width:'550px',
          height:'550px'
         })
         
         dialogRef.afterClosed().subscribe({
          next:(val)=>{
            console.log(123)
            console.log(val)
            console.log(456)
            console.log(id);
            if(val){
              this.getEmployeeList();
            }
          }
         })
      }


}
