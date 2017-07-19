import { Component, OnInit } from '@angular/core';
import { JobService } from "app/service/job.service";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  obj={_id:"",name:"",description:"",duration:"",hourFee:"",preferDate:"",preferTime:""};
  id;
  name;
  description;
  duration;
  fee;
  date;
  time;
  constructor(private jobService:JobService) { 
    
  }

  ngOnInit() {
    this.jobService.selectedJob.subscribe(data=>{
        //let data=resp.json();
        console.log('Object I broguht from the other comp: '+data);
        /*this.id=data._id;
        this.name=data.name;
        this.description=data.description;
        this.duration=data.duration;
        this.fee=data.hourFee;
        this.date=data.preferDate;
        this.time=data.preferTime;*/
    });
  }

  onSubmit(){
    //jobId:number
    //this.jobService.
  }

}
