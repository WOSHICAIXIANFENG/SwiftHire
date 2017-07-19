/**
 * Created by Samuel on 18/7/2017.
 */
import { Component, OnInit, Inject,OnDestroy,Input } from '@angular/core';
import { JobService } from "app/service/job.service";
import { UserService } from "app/service/user.service";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'ratecomment',
  template:`
   <div>Show details info for Job </div>
    <div>Show one form </div>
    {{jobObj | json}}
  `,
  providers:[]
})

export class RateCommentComponent implements OnDestroy {
  private subscription: Subscription;

  @Input() jobObj:any;

  constructor(private userService: UserService) {

  }


  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
