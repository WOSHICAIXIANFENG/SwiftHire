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
}
