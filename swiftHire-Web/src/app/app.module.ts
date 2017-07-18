import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';

import { myRoutes } from "./app.routes";
import { JobService } from './service/job.service';
import { UserService } from './service/user.service';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { CandidateComponent } from './component/candidate.component';
import { CandidateItemComponent } from './component/candidate.item.component';
import { CandidatesComponent } from './component/candidates.component';
import { CommentComponent } from './component/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    CandidatesComponent,
    CandidateComponent,
    CandidateItemComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    myRoutes
  ],
  providers: [JobService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
