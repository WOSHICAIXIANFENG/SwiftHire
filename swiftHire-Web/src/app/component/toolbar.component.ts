// components/toolbar.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'toolbar',
  template: `
    <div class="toolbar">
      <button (click)="auth.login()" *ngIf="!auth.loggedIn()">
        Login
      </button>
      <button (click)="auth.logout()" *ngIf="auth.loggedIn()">
        Logout
      </button>
    </div>
  `,
  providers:[AuthService]
})
export class ToolbarComponent {
  constructor(private auth: AuthService) {}
  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
}