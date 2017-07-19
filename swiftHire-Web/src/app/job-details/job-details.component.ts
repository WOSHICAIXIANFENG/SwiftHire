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

  constructor(private jobService:JobService) { 
  }

  ngOnInit() {
    
  }

}
