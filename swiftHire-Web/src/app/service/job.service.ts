import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../AppConfig';
import 'rxjs/add/operator/map';

@Injectable()
export class JobService {
  selectedJob: EventEmitter<number>;
  constructor(public http:Http) {
    this.selectedJob=new EventEmitter();
   }

   selectJob(job:number){
     console.log('The object to emit is: '+job);
      this.selectedJob.emit(job);
       console.log("selectJOb");
   }

  getAllNearJobs(lat: number, long: number) {
    return this.http.get(AppConfig.BASE_URL + "jobs/?lat="+lat+"&long="+long)
                    .map(res=>res.json());
  }

   getJobs() {
    return this.http.get(AppConfig.BASE_URL + "jobs/all");
  }

  postOneJob() {

  }

  /**
   * Function to choose one candidate
   * @param candidateId
   * @param jobId
   * @returns {Observable<Response>}
   */
  pickCandidateForJob(candidateId:string, jobId:string) {
    let body = {
      "candidateId":candidateId,
      "jobId":jobId
    }
    return this.http.post(AppConfig.BASE_URL + "jobs/choose", body);
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
