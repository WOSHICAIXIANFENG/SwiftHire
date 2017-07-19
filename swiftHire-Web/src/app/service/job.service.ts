import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../AppConfig';
import 'rxjs/add/operator/map';

@Injectable()
export class JobService {
  constructor(public http:Http) {}

  getAllNearJobs(lat: number, long: number) {
    return this.http.get(AppConfig.BASE_URL + "jobs/?lat="+lat+"&long="+long)
                    .map(res=>res.json());
  }

   getJobs() {
    return this.http.get(AppConfig.BASE_URL + "jobs/all");
  }

  getJobByLocation(location:string){
      return this.http.get(AppConfig.BASE_URL + "jobs/location/"+location);
  }

  getJobByCategory(category:string){
    return this.http.get(AppConfig.BASE_URL + "jobs/category/"+category);
  }

  getJobByFee(fee:number){
     return this.http.get(AppConfig.BASE_URL + "jobs/fee/"+fee);
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

  /**
   * Get candidate list for one job
   * @param jobId
   * @returns {Observable<Response>}
   */
  getCandidateList(jobId: any) {
    return this.http.get(AppConfig.BASE_URL + "jobs/" + jobId + "/candidate");
  }

  /**
   * Function to get all posted jobs by userId
   * @param userId
   * @returns {Observable<Response>}
   */
  getJobsEnrolled(userId: any) {
    return this.http.get(AppConfig.BASE_URL + "jobs/" + userId + "/apply");
  }
}
