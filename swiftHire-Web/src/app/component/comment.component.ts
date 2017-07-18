/**
 * Created by Samuel on 13/7/2017.
 */
import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'comment',
  template:`  
    <div>
      <span>{{item.content}}</span>
      <span>{{item.date }}</span>
      <span>{{item.rate}}</span>
    </div>
  `,
  providers:[]
})


export class CommentComponent implements OnInit {
  @Input() item:any;
  invalidate:boolean;

  constructor() {
    this.invalidate = false;
  }

  ngOnInit() {

  }
}
