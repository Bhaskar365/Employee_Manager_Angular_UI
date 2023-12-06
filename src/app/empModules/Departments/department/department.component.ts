import { Component, OnInit } from '@angular/core';
import { ApiServService } from 'src/app/services/api-serv.service';
import { Department } from '../../employee-components/models/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit{

  addDeptFormValue!:Department;
 departmentDetails : any;

  constructor(private api:ApiServService) { }

  newDepartment = new FormGroup({
    DepartmentId : new FormControl('', [Validators.required]),
    DepartmentName : new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.api.getAllDepartments().subscribe(res=> {
      this.departmentDetails = res;
    })
  }

  addNewDepartment() {
    this.addDeptFormValue = this.convertFormGroupToDepartment(this.newDepartment);
    
    this.api.addNewDepartment(this.addDeptFormValue).subscribe(res => {
      console.log(res);
    });
  }

  convertFormGroupToDepartment(formGroup: FormGroup): Department {
    return {
      DepartmentId: formGroup.get('DepartmentId')?.value,
      DepartmentName: formGroup.get('DepartmentName')?.value,
    };
  }

  get deptID(){
    return this.newDepartment.get('DepartmentId')
  }

  get DeptName(){
    return this.newDepartment.get('DepartmentName')
  }

  getDepartmentIDError() {
    return this.newDepartment.controls?.['DepartmentId'].hasError('required') ? "Enter ID" : " ";
  }

  getDepartmentNameError() {
    return this.newDepartment.controls?.['DepartmentName'].hasError('required') ? "Enter Department Name" : " ";
  }
}
