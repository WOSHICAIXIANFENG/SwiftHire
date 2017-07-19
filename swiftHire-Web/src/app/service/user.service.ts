import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../AppConfig';

@Injectable()
export class UserService {

  constructor(public http:Http) { }

  getAllUsers() {
    return this.http.get(AppConfig.BASE_URL + "users/");
  }

  postUserDetail(userId: string) {
    return this.http.get(AppConfig.BASE_URL + "users/" + userId);
  }

  /**
   * Get User(worker or job owner) detail information
   * @param userId
   * @returns {Observable<Response>}
   */
  getUserDetail(userId: string) {
    return this.http.get(AppConfig.BASE_URL + "users/" + userId);
  }

  /**
   * Add comment for Owner
   * @returns {Observable<Response>}
   */
  addCommentForOwner(content:string, date:string, rate:string, jobId:string, jobOwner:string, jobOwnerId:string) {
    return this.http.post(AppConfig.BASE_URL + "users/", {
      "content": content,
      "date": date,
      "rate": rate,
      "jobOwner": jobOwner,
      "jobId": jobId,
      "jobOwnerId":jobOwnerId
    });
  }
}
