import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  constructor(private router:ActivatedRoute,public serv:ServiceService){}

  x:any;
  dataById:any;

  ngOnInit()
  {
    const id = this.router.snapshot.paramMap.get('id');

    console.log(id);

    this.serv.getData(id).subscribe((res:any)=>{
      
      console.log(123)
      this.dataById = res;
      console.log(res);

    })
  }


}
