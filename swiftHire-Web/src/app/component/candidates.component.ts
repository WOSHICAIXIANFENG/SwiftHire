/**
 * Created by Samuel on 18/7/2017.
 */
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../service/job.service';
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'candidate-list',
  template:`    
    <div *ngFor="let candidate of candidates" class="col-md-8">
      <candidate-item [item]="candidate" class="row"></candidate-item>
    </div>
    <br>
    <router-outlet></router-outlet>
  `,
  providers:[]
})

export class CandidatesComponent implements OnInit,OnDestroy {
  @Input() candidates:any;

  private subscription: Subscription;

  constructor(private jobService: JobService, private activatedRoute: ActivatedRoute,) {
    this.subscription = activatedRoute.queryParams.subscribe(
      (param: any) => {
        let jobId = param['jobId'];
        this.subscription = this.jobService.getCandidateList(jobId).subscribe(resp=>{
            //console.log(resp);
            this.candidates = resp.json().waitingList;
          },
          error=>{
            console.log('This doesnt work');
          },()=>{});
      }
    );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
