import { Component, OnInit, Inject,OnDestroy } from '@angular/core';
import { JobService } from "app/service/job.service";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'jobs-enrolled',
  template: `
    <div class="container">
      <div class="col-md-8 col-md-offset-2">
        <table class="table">
          <tr class="row">
            <th>Tittle</th>
            <th>Hours</th>
            <th>Payment Fee</th>
            <th>Date</th>
            <th>Time</th>
            <th></th>
          </tr>
          
          <tr class="row" *ngFor="let j of jobs | chosenpipe">
            <td>{{j.name}}</td>
            <td>{{j.duration}}</td>
            <td>{{j.hourFee}}</td>
            <td>{{j.preferDate}}</td>
            <td>{{j.preferTime}}</td>
            <td><a [routerLink]="['details']" class="btn btn-primary">Details</a></td>
            <td *ngIf="checkIfJobStart()"><a [routerLink]="['addcomment']" [queryParams]="{jobId: j._id}" class="btn btn-primary">Add Comment</a></td>
          </tr>

          <tr class="row" *ngFor="let j of jobs | waitpipe">
            <td>{{j.name}}</td>
            <td>{{j.duration}}</td>
            <td>{{j.hourFee}}</td>
            <td>{{j.preferDate}}</td>
            <td>{{j.preferTime}}</td>
            <td><a [routerLink]="['details']" class="btn btn-primary">Details</a></td>
          </tr>
        </table>
      </div>
    </div>
    
    <router-outlet></router-outlet>
    
  `
})

export class JobsEnrolledComponent implements OnInit,OnDestroy {
  jobs: any;

  private subscription: Subscription;

  constructor(private jobService:JobService) {}

  ngOnInit() {
    // try to get my userId from localstorage.
    // todo it
    let ownderId = 3;

    this.subscription = this.jobService.getJobsEnrolled(ownderId).subscribe(resp=>{
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

  checkIfJobStart() {
    return true;
  }

}
