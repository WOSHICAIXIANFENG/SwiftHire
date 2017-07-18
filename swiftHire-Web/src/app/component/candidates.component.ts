/**
 * Created by Samuel on 18/7/2017.
 */
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { JobService } from '../service/job.service';

@Component({
  selector: 'candidate-list',
  template:`    
    <div *ngFor="let candidate of candidates">
      <candidate-item [item]="candidate"></candidate-item>
    </div>
    <br>
    <router-outlet></router-outlet>
  `,
  providers:[]
})

export class CandidatesComponent implements OnInit,OnDestroy {
  @Input() candidates:any;

  constructor(private jobService: JobService) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
