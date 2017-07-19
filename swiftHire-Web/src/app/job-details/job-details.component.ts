import { Component, OnInit } from '@angular/core';
import { JobService } from "app/service/job.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  inputs: ['data'],
})
export class JobDetailsComponent implements OnInit {
  data;
  obj={_id:"",name:"",description:"",duration:"",hourFee:"",preferDate:"",preferTime:""};
  constructor(private jobService:JobService) { 
    this.jobService.selectedJob.subscribe(data=>{
        //let data=resp.json();
        console.log('Object I brought from the other comp: '+data);
        /*this.id=data._id;
        this.name=data.name;
        this.description=data.description;
        this.duration=data.duration;
        this.fee=data.hourFee;
        this.date=data.preferDate;
        this.time=data.preferTime;*/
    });
  }

  ngOnInit() {
    
  }

  onSubmit(){
    console.log('Getting the on click event');
    //jobId:number
    //this.jobService.
  }

}
