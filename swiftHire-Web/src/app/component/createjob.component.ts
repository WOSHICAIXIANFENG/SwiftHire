import { Component, OnInit, Inject,OnDestroy,Input } from '@angular/core';
import { JobService } from "app/service/job.service";
import { UserService } from "app/service/user.service";
import { Subscription } from "rxjs/Rx";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { WindowRef } from '../WindowRef';

@Component({
  selector: 'createjob',
  templateUrl:`./createjob.component.html`,
  providers:[]
})

export class CreateJobComponent implements OnDestroy {
   private subscription: Subscription;
   myForm: FormGroup;
   //jobId:string;
   @Input() jobObj:any;

  constructor(private userService: UserService, private jobService: JobService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private window: WindowRef) {

    let myId = localStorage.getItem("userId");

    this.myForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'categories': ['', [Validators.required]],
      'duration': ['', [Validators.required]],
      'hourFee': ['', [Validators.required]],
      'preferDate': ['', [Validators.required]],
      'preferTime': ['', [Validators.required]],
      'lat':[''],
      'long':['']
    });

    this.window.nativeWindow.navigator.geolocation.getCurrentPosition(success=>{
        let lat=success.coords.latitude;
        let long=success.coords.longitude;
        
        this.jobService.getAllNearJobs(lat,long).subscribe(resp=>{
          console.log(resp);
        },
         error=>{
              alert('Your browser does not allow geolocation');
        });
    });
    
  }

  ngOnInit() {}

  onSubmit() {
    let myId = localStorage.getItem("userId");
    var name = this.myForm.controls['name'].value;
    var description = this.myForm.controls['description'].value;
    var categories = this.myForm.controls['categories'].value;
    var duration = this.myForm.controls['duration'].value;
    var hourFee = this.myForm.controls['hourFee'].value;
    var preferDate = this.myForm.controls['preferDate'].value;
    var preferTime = this.myForm.controls['preferTime'].value;

    this.window.nativeWindow.navigator.geolocation.getCurrentPosition(success=>{
        let lat=success.coords.latitude;
        let long=success.coords.longitude;
        this.myForm.controls['lat']=lat;
        this.myForm.controls['long']=long;
        this.jobService.postOneJob(this.myForm).subscribe(success=>{

        },
        error=>{
            alert('It was not possible to post the job, an error happend');
        });
    });
    
    // this.jobService.postOneJob(this.jobObj.userId).subscribe(resp => {
    // //     let jobOwner = resp.json().name;
    //      this.subscription = this.jobService.getJobsPosted(this.jobObj.userId).subscribe(resp=>{
    //          this.myForm.reset();
    //        },
    //        error=>{
    //          console.log('This doesnt work');
    //        },()=>{});
    //    },
    //    error=>{
    //      console.log('This doesnt work');
    //    },()=>{});

    //  console.log(this.myForm.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
