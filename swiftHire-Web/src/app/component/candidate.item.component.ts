/**
 * Created by Samuel on 13/7/2017.
 */
import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'candidate-item',
  template:`  
    <div>
      <img [src]="item.avatar"/> <span>{{item.name}}</span><span>{{item.avergeRate}}</span>
      <a [routerLink]="['detail']" [queryParams]="{id: item._id}">Detail</a>
    </div>
  `,
  providers:[]
})


export class CandidateItemComponent implements OnInit {
  @Input() item:any;
  invalidate:boolean;

  constructor() {
    this.invalidate = false;
  }

  ngOnInit() {

  }

}
