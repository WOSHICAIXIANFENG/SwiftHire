/**
 * Created by Samuel on 18/7/2017.
 */
import { Component, OnInit, Inject,OnDestroy,Input } from '@angular/core';
import { JobService } from "app/service/job.service";
import { UserService } from "app/service/user.service";
import { Subscription } from "rxjs/Rx";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'ratecomment',
  templateUrl:`./ratecomment.component.html`,
  providers:[]
})

export class RateCommentComponent implements OnDestroy {
  private subscription: Subscription;
  myForm: FormGroup;

  @Input() jobObj:any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    let da = new Date().toString();
    this.subscription = this.userService.addCommentForOwner(content, da).subscribe(resp=>{
        this.jobObj=resp;
      },
      error=>{
        console.log('This doesnt work');
      },()=>{});
  }

  onSubmit() {
    console.log(this.myForm);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
