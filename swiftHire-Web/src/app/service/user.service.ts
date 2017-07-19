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

  addCommentForOwner(content:string, date:string) {
    return this.http.post(AppConfig.BASE_URL + "users/", {
      "content": content,
      "date": date
      // todo
    });
  }
}
