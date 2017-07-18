import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';

import { myRoutes } from "./app.routes";
import { JobService } from './service/job.service';
import { UserService } from './service/user.service';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { JobsComponent } from './jobs/jobs.component';
import { WindowRef } from "app/WindowRef";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    JobsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    myRoutes
  ],
  providers: [JobService,UserService,WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
