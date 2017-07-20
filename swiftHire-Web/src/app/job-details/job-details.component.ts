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
  hideApplyBtn:boolean;

  constructor(private jobService:JobService) {
    this.hideApplyBtn = false;
  }

  ngOnInit() {

  }

  onSubmit() {
    // apply one job for current user
    let candidateId = localStorage.getItem("userId");
    console.log("Samuel test candidateId = " + candidateId);
    console.log("Samuel test this.data._id = " + this.data._id);
    this.jobService.applyOneJob(candidateId, this.data._id).subscribe(
      res => {
        // you app success
        alert("Your application was submitted successfully");

      }
    );
  }

}
