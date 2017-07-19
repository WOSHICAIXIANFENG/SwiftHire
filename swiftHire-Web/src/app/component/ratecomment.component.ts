/**
 * Created by Samuel on 18/7/2017.
 */
import { Component, OnInit, Inject,OnDestroy,Input } from '@angular/core';
import { JobService } from "app/service/job.service";
import { UserService } from "app/service/user.service";
import { Subscription } from "rxjs/Rx";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ratecomment',
  templateUrl:`./ratecomment.component.html`,
  providers:[]
})

export class RateCommentComponent implements OnDestroy {
  private subscription: Subscription;
  myForm: FormGroup;
  jobId:string;
  @Input() jobObj:any;

  constructor(private userService: UserService,private jobService: JobService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.subscription = activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.jobId = param['jobId'];
        this.subscription = this.jobService.getCandidateList(this.jobId).subscribe(resp=>{
            //console.log(resp);
            if(resp && resp.json()) {
              this.jobObj = resp.json();
            } else {
              this.jobObj = {};
            }
          },
          error=>{
            console.log('This doesnt work');
          },()=>{});
      }
    );
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
    
    this.subscription = this.userService.addCommentForOwner(content, date, rate).subscribe(resp=>{
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
