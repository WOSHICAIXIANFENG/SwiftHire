import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions, ConnectionBackend} from '@angular/http';
import { AuthHttp,AuthConfig } from 'angular2-jwt';

import { myRoutes } from "./app.routes";
import { JobService } from './service/job.service';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { JobsComponent } from './jobs/jobs.component';
import { WindowRef } from "app/WindowRef";
import { CandidateComponent } from './component/candidate.component';
import { CandidateItemComponent } from './component/candidate.item.component';
import { CandidatesComponent } from './component/candidates.component';
import { CommentComponent } from './component/comment.component';
import { ToolbarComponent} from './components/toolbar.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobsPostedComponent } from './component/jobsposted.component';
import { RateCommentComponent } from './component/ratecomment.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    JobsComponent,
    CandidatesComponent,
    CandidateComponent,
    CandidateItemComponent,
    CommentComponent,
    ToolbarComponent,
    JobDetailsComponent,
    JobsPostedComponent,
    RateCommentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    myRoutes
  ],
  providers: [JobService,
    UserService,
    WindowRef,
     AuthService,
     {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
