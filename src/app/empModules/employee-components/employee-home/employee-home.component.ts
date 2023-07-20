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
import * as XLSX from 'xlsx';

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
  fileName: any;

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

  //GET ALL EMPLOYEES DATA
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

  //VIEW DETAILS BY ID
  getEmployeeById(id: any) {
    const dialogRef = this.matDialog.open(EmployeeViewComponent,
      {
        data: { id },
      });
    dialogRef.afterClosed().subscribe(res => {
      res = res.data;
    });
  }

  //ADD NEW DETAILS
  addNewEmployee() {
    const _dialogRef = this.matDialog.open(EmployeeAddNewComponent);
  }

  //EDIT DETAILS
  editEmployeeDetails(value: any) {
    const dialogR = this.matDialog.open(EmployeeEditComponent,
      {
        data: { value },
      });
    dialogR.afterClosed().subscribe(res => {
      res = res.data;
    })
  }

  //DELETE DETAILS
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

    let pageIndex = (this.selectedPage - 1) * this.employeesPerPage;
    let endIndex = (this.selectedPage - 1) * this.employeesPerPage + this.employeesPerPage;
    this.employeeData_Sliced_Data = [];
    this.employeeData_Sliced_Data = this.employeeData_API_Filtered.slice(pageIndex, endIndex);
  }

  //---------------------------------------END----------------------------------------------//

  //Filter Code
  filter() {

    this.employeeData_API_Filtered = [...this.employeeDataFromAPI.filter((user: any) => user.name.toLowerCase().includes(this.filterBy))];
    this.employeeData_Sliced_Data = this.employeeData_API_Filtered;

  }

  printPage() {
    window.print();
  }

  //excel export
  convertToExcel() {
    if (!this.employeeData_Sliced_Data || this.employeeData_Sliced_Data.length === 0) {
      console.error('No data available for Excel generation.');
      return;
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employeeData_Sliced_Data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    this.fileName = 'generated.xlsx'; // Set the desired file name
    XLSX.writeFile(wb, this.fileName);
  }

}
