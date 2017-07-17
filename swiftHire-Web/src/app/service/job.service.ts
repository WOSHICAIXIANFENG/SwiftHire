import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../AppConfig';

@Injectable()
export class JobService {

  constructor(public http:Http) { }

  getAllNearJobs(lat: number, long: number) {
    return this.http.get(AppConfig.BASE_URL + "jobs/");
  }

  postOneJob() {

  }

  applyOneJob() {

  }
}
