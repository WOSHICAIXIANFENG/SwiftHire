// services/auth.service.ts
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

// We want to avoid any 'name not found'
// warnings from TypeScript
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

 lock = new Auth0Lock('wPOJ2LiGIJgiiuqWnirTs2IIMd2q7Te9', 'swift-hire.auth0.com');

  constructor(private router: Router) {
    this.lock.on("loggedIn",result => {

    });
 }


 login() {
   this.lock.show((error: string, profile: Object, id_token: string) => {
     if (error) {
       console.log(error);
     }
     // We get a profile object for the user from Auth0
     localStorage.setItem('profile', JSON.stringify(profile));
     // We also get the user's JWT
    //  localStorage.setItem('id_token', id_token);
    localStorage.setItem('token', id_token);

     //console.log("id_token = " + id_token);
     //console.log(tokenNotExpired());
     //this.router.navigate(['/home233']);
   });
 }

 logout() {
   // To log out, we just need to remove
   // the user's profile and token
   localStorage.removeItem('profile');
//    localStorage.removeItem('id_token');
    localStorage.removeItem('token');
 }

 loggedIn(): boolean {
    return tokenNotExpired();
 }
}
