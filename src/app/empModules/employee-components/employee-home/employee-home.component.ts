import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError } from 'rxjs';
import { ApiServService } from 'src/app/services/api-serv.service';
import { EmployeeViewComponent } from '../employee-view/employee-view.component';
import { EmployeeAddNewComponent } from '../employee-add-new/employee-add-new.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';


@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit {

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

  constructor(private serv: ApiServService,
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
    const dialogRef = this.matDialog.open(EmployeeViewComponent,
      {
        data: { id },
      });
    dialogRef.afterClosed().subscribe(res => {
      res = res.data;
    });
  }

  addNewEmployee() {
    const _dialogRef = this.matDialog.open(EmployeeAddNewComponent);
  }

  //VIEW DETAILS
  editEmployeeDetails(value: any) {
    const dialogR = this.matDialog.open(EmployeeEditComponent,
      {
        data: { value },
      });
    dialogR.afterClosed().subscribe(res => {
      res = res.data;
    })
  }

  deleteEmployeeById(value: any) {
    const _dialogR = this.matDialog.open(EmployeeDeleteComponent, {
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
  //   const dialogRef = this.matDialog.open(employeeview, {
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
    const dialogRef = this.matDialog.open(EmployeeViewComponent, {
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
