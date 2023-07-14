import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ActivatedRoute, Router, withDebugTracing } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { ViewComponentComponent } from '../view-component/view-component.component';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, catchError } from 'rxjs';
import { MatViewDialogBoxComponent } from '../mat-view-dialog-box/mat-view-dialog-box.component';
import { AddEmployeeCompComponent } from '../add-employee-comp/add-employee-comp.component';
import { MatEditDialogCompComponent } from '../mat-edit-dialog-comp/mat-edit-dialog-comp.component';
import { MatDeleteDialogComponent } from '../mat-delete-dialog/mat-delete-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  pageOfItems?: any;

  obs$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  errMsg: any;
  data1: any;
  filteredData: any[] = [];
  filterBy: any;
  employeeDataFromAPI: any;
  employeeData_API_Filtered: any;
  employeeData_Sliced_Data: any;
  isLoading = true;

  employeesPerPage: number = 8;
  public selectedPage = 1;
  employees: any[] = [];

  constructor(private serv: ServiceService,
    private matDialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllEmployeeData();
  }

  getAllEmployeeData() {
    this.serv.getAllEmployees().pipe(catchError((err) => {
      this.router.navigate(['404']);
      return err;
    })).subscribe(res => {
      this.isLoading = false;
      this.employeeDataFromAPI = res;
      this.employeeData_API_Filtered = [...this.employeeDataFromAPI];
      this.employeeDataFromAPI.paginator = this.paginator;
      let pageIndex = (this.selectedPage - 1) * this.employeesPerPage;
      this.employeeData_Sliced_Data = this.employeeData_API_Filtered.slice(pageIndex, this.employeesPerPage);
    })
  }

  //
  getEmployeeById(id: any) {
    const dialogRef = this.matDialog.open(MatViewDialogBoxComponent,
      {
        data: { id },
      });
    dialogRef.afterClosed().subscribe(res => {
      res = res.data;
    });
  }

  addNewEmployee() {
    const _dialogRef = this.matDialog.open(AddEmployeeCompComponent);
  }

  //VIEW DETAILS
  editEmployeeDetails(value: any) {
    const dialogR = this.matDialog.open(MatEditDialogCompComponent,
      {
        data: { value },
      });
    dialogR.afterClosed().subscribe(res => {
      res = res.data;
    })
  }

  deleteEmployeeById(value: any) {
    const _dialogR = this.matDialog.open(MatDeleteDialogComponent, {
      data: { value },
    });
    _dialogR.afterClosed().subscribe(res => {
      res = res.data;
    });
  }

  //-----------------------------PAGINATOR LOGIC CODE----------------------------------------------//
  //------------------------------------BEGIN------------------------------------------------------//

  //change page size of paginator
  changePageSize(event: Event) {

    const newSize = (event.target as HTMLInputElement).value;
    this.employeesPerPage = Number(newSize);
    this.changePage(1);
  }

  //get paginator page number
  get pageNumbers(): number[] {
    // return Array(Math.ceil(this.filteredData.length/this.employeesPerPage))
    //     .fill(0).map((x,i)=>i+1);

    return Array(Math.ceil(this.employeeData_API_Filtered.length / this.employeesPerPage))
      .fill(0).map((x, i) => i + 1);

  }

  //change paginator page 
  changePage(page: any) {
    this.selectedPage = page;
    this.slicedEmployees();
  }

  //sliced paginator data 
  slicedEmployees() {
    // let pageIndex = (this.selectedPage - 1) * this.employeesPerPage;
    // let endIndex = (this.selectedPage - 1) * this.employeesPerPage + this.employeesPerPage;
    // this.employees = [];
    // this.employees = this.filteredData.slice(pageIndex,endIndex);

    let pageIndex = (this.selectedPage - 1) * this.employeesPerPage;
    let endIndex = (this.selectedPage - 1) * this.employeesPerPage + this.employeesPerPage;
    this.employeeData_Sliced_Data = [];
    this.employeeData_Sliced_Data = this.employeeData_API_Filtered.slice(pageIndex, endIndex);
  }

  //---------------------------------------END----------------------------------------------//

  //Filter Code
  filter() {
    // this.filteredData = [...this.data1.filter((user:any) => user.name.toLowerCase().includes(this.filterBy))];
    // this.employees = this.filteredData;

    this.employeeData_API_Filtered = [...this.employeeDataFromAPI.filter((user: any) => user.name.toLowerCase().includes(this.filterBy))];
    this.employeeData_Sliced_Data = this.employeeData_API_Filtered;

  }

  //GET EMPLOYEE
  // getEmployeeList(){
  //   this.serv.getEmployees().subscribe((res:any)=>{
  //     this.data1 = res; 
  //     console.log(res);
  //     this.filteredData = [...this.data1];
  //     this.data1.paginator = this.paginator;
  //     let pageIndex = (this.selectedPage - 1) * this.employeesPerPage;
  //     this.employees = this.filteredData.slice(pageIndex,this.employeesPerPage);
  //   })
  // }

  //EDIT EMPLOYEE
  // editBoxDialog(data: any) {
  //   const dialogRef = this.matDialog.open(DialogBodyComponent, {
  //     data,
  //     width: '550px',
  //     height: '550px',
  //   });

  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {

  //       if (val) {
  //         // this.getEmployeeList();
  //       }
  //     }
  //   })
  // }

  // //DELETE EMPLOYEE
  // deleteEmployees(id:number){
  //     this.serv.deleteEmployees(id).subscribe({
  //       next:(res)=>{
  //         // this.getEmployeeList();
  //       },
  //       error:(err:any)=>{
  //         console.log(err)
  //       }
  //     })
  // }

  //VIEW DETAILS
  viewEmployeeDetails(id: any) {
    const dialogRef = this.matDialog.open(ViewComponentComponent, {
      id,
      width: '550px',
      height: '550px'
    })

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        console.log(123)
        console.log(val)
        console.log(456)
        console.log(id);
        if (val) {
          // this.getEmployeeList();
        }
      }
    })
  }


}
