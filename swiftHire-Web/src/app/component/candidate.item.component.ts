/**
 * Created by Samuel on 13/7/2017.
 */
import { Component, OnInit, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'candidate-item',
  template:`
    <div class="list-group-item w-100" >
      <div>
        <img [src]="item.avatar" class="img-circle" width="85" height="85" title="{{item.name}}"/>
        <span><b style="font-size:23px; padding-left:50px; padding-right:120px; ">{{item.name}}</b></span>
        <small style="margin-left: 200px">Average Rate: {{average}}</small>
        <button (click)="onPick(item)" class="btn btn-outline-primary btn-sm" style="float: right">Choose</button>
      </div>
      <div *ngFor="let comment of item.comments">
            <comment [item]="comment"></comment>
      </div>
    </div>
  `,
  providers:[]
})


export class CandidateItemComponent implements OnInit {
  @Input() item:any;
  invalidate:boolean;
  average:any;

  constructor(private router: Router) {
    this.invalidate = false;
  }

  ngOnInit() {
    this.average = 5;
    if (this.item && this.item.comments) {
        // calculate average rate
        let size = this.item.comments.length;
        this.average = this.item.comments.reduce((a, b) => a.rate + b.rate) / size;
        console.log("Samuel Test average = " + this.average);
    }
  }

  onPick(item: any) {
    var result = confirm("Are you sure choose this candidate to do your job?");
    if (result) {
      // if user choose 'OK'.
      // call API to appy this job.
      // navigate to home page
      this.router.navigate(['/']);
    }
  }
}
