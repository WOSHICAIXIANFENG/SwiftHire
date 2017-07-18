import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../AppConfig';

@Injectable()
export class JobService {

  constructor(public http:Http) { }

  getAllNearJobs(lat: number, long: number) {
<<<<<<< HEAD
    return this.http.get(AppConfig.BASE_URL + "jobs/?lat="+lat+"&long="+long);
  }

   getJobs() {
=======
>>>>>>> bf20d1ddeb45695f0157ad5d0da4ed7844273046
    return this.http.get(AppConfig.BASE_URL + "jobs/all");
  }

  postOneJob() {

  }

  applyOneJob() {

  }
}
