/**
 * Created by Samuel on 13/7/2017.
 */
import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'candidate-item',
  template:`  
    <div>
      <img [src]="item.avatar" class="img-circle" width="125" height="125" title="{{item.name}}"/> <span><b style="font-size:25px; padding-left:50px; padding-right:120px;">{{item.name}}</b></span><span>5</span>
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
