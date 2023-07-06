import { Component , Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-view-dialog-box',
  templateUrl: './mat-view-dialog-box.component.html',
  styleUrls: ['./mat-view-dialog-box.component.scss']
})
export class MatViewDialogBoxComponent implements OnInit {

  x:any;

  constructor( private _dialogRef:MatDialogRef<MatViewDialogBoxComponent>,
               @Inject(MAT_DIALOG_DATA) public data:any,
             ) {}

    ngOnInit(){
          this.x = this.data.id;
          // console.log(this.x);
    }

    closeFunc(){
        this._dialogRef.close();
    }
}
