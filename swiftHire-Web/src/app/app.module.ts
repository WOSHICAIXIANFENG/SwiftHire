import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JobService } from './service/job.service';
import { UserService } from './service/user.service';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [JobService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
