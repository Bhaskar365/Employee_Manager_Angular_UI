import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiServService } from 'src/app/services/api-serv.service';
import * as XLSX from 'xlsx';

type NewType = FormGroup;

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {

  x:any;
  fileName:any;

  constructor( private _dialogRef:MatDialogRef<EmployeeViewComponent>,
               @Inject(MAT_DIALOG_DATA) public data:any,
             ) {}

    ngOnInit(){
          this.x = this.data.id;
          // console.log(this.x);
    }

    closeFunc(){
        this._dialogRef.close();
    }

    printPage() {
      window.print();
    }
  
    //excel export
    convertToExcel() {
      if (!this.x || this.x.length === 0) {
        console.error('No data available for Excel generation.');
        return;
      }
  
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.x);
  
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      /* save to file */
      this.fileName = 'generated.xlsx'; // Set the desired file name
      XLSX.writeFile(wb, this.fileName);
    }

}
