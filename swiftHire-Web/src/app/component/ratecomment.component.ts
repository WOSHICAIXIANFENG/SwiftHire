/**
 * Created by Samuel on 18/7/2017.
 */
import { Component, OnInit, Inject,OnDestroy,Input } from '@angular/core';
import { JobService } from "app/service/job.service";
import { UserService } from "app/service/user.service";
import { Subscription } from "rxjs/Rx";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'ratecomment',
  templateUrl:`./ratecomment.component.html`,
  providers:[]
})

export class RateCommentComponent implements OnDestroy {
  private subscription: Subscription;
  myForm: FormGroup;

  @Input() jobObj:any;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      'rate': ['', [Validators.required]],
      'content': ['', [Validators.required]]
    });
  }

  onSubmit() {
    let date = new Date().toString();
    let rate = this.myForm.controls['rate'].value;
    let content = this.myForm.controls['content'].value;
    let jobId = 2;
    let jobOwner = "Hello";
    this.subscription = this.userService.addCommentForOwner(content, date, rate, jobId, jobOwner).subscribe(resp=>{
        this.jobObj=resp;
      },
      error=>{
        console.log('This doesnt work');
      },()=>{});
    console.log(this.myForm);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
