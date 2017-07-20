import { Component, OnInit, Inject,OnDestroy } from '@angular/core';
import { JobService } from "app/service/job.service";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'jobs-posted',
  template: `
    <div class="container">
        <table class="table">
          <tr class="row">
            <th>Tittle</th>
            <th>Hours</th>
            <th>Payment Fee</th>
            <th>Date</th>
            <th>Time</th>
            <th></th>
            <th></th>
          </tr>
          <tr class="row" *ngFor="let j of jobs">
            <td>{{j.name}}</td>
            <td>{{j.duration}}</td>
            <td>{{j.hourFee}}</td>
            <td>{{j.preferDate}}</td>
            <td>{{j.preferTime}}</td>
            <td><a class="btn btn-primary" (click)="selectedData=j;hideFlag=false;">Details</a></td>
            <td><a [routerLink]="['candidates']" [queryParams]="{jobId: j._id}" class="btn btn-primary" (click)="onBtnClick()">Candidates</a></td>
          </tr>
        </table>
        <app-job-details *ngIf="selectedData && !hideFlag" [data]="selectedData"></app-job-details>
        <router-outlet></router-outlet>
    </div>
  `
})

export class JobsPostedComponent implements OnInit,OnDestroy {
  jobs: any;
  selectedData;
  hideFlag:boolean;
  private subscription: Subscription;

  constructor(private jobService:JobService) {}

  onBtnClick() {
    this.hideFlag = true;
  }

  ngOnInit() {
    // try to get my userId from localstorage.
    let myId = localStorage.getItem("userId");
    this.subscription = this.jobService.getJobsPosted(myId).subscribe(resp=>{
        //console.log(resp);
        this.jobs=resp.json();
      },
      error=>{
        console.log('This doesnt work');
      },()=>{});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
