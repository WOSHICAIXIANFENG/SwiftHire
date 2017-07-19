import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../AppConfig';
import 'rxjs/add/operator/map';

@Injectable()
export class JobService {

  constructor(public http:Http) { }

  getAllNearJobs(lat: number, long: number) {
    return this.http.get(AppConfig.BASE_URL + "jobs/?lat="+lat+"&long="+long)
                    .map(res=>res.json());
  }

   getJobs() {
    return this.http.get(AppConfig.BASE_URL + "jobs/all");
  }

  postOneJob() {

  }

  applyOneJob() {

  }

  /**
   * Function to get all posted jobs by userId
   * @param userId
   * @returns {Observable<Response>}
   */
  getJobsPosted(userId: any) {
    return this.http.get(AppConfig.BASE_URL + "jobs/" + userId + "/post");
  }
}
