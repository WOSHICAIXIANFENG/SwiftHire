import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { WindowRef } from '../WindowRef';
import { JobService } from "app/service/job.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  searched:boolean;
  jobs;
  closeJobs;
  searchedJobs;
  searchForm: FormGroup;
  onSelected:EventEmitter<any>;
  selectedData;

  constructor(private jobService:JobService, private window: WindowRef, private fb: FormBuilder) {
   this.onSelected=new EventEmitter();
   this.searched=false;
   this.searchForm=this.fb.group({
          'search':['',Validators.required]
   });
   this.window.nativeWindow.navigator.geolocation.getCurrentPosition(success=>{
        let lat=success.coords.latitude;
        let long=success.coords.longitude;
        this.jobService.getAllNearJobs(lat,long).subscribe(resp=>{
          console.log(resp);
          this.closeJobs=resp;
        },
         error=>{
              console.log('This shit doesnt work');
        });},
        error=>{
              alert('We are sorry your browser does not support geolocation detection');
          });
   }

  select(jobId){
     console.log('On select event: '+ jobId.toString());
     for(let job of this.jobs){
       console.log(job._id);
       if(jobId.toString() == job._id){
          console.log("=====");
          this.jobService.selectJob(job._id);
       } 
     }
     
   }
   
  ngOnInit() {
  }

  onSearch(){
    console.log('Go to the server and filter '+this.searchForm.controls['search'].value);
  }

}
