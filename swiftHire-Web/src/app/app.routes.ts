import { RouterModule, Routes } from "@angular/router";
import { JobsComponent } from "./jobs/jobs.component";
import { JobDetailsComponent } from "./job-details/job-details.component";
import { ErrorComponent } from "./error/error.component";
import { CandidatesComponent } from './component/candidates.component';
import { CandidateComponent } from './component/candidate.component';
import { JobsPostedComponent } from './component/jobsposted.component';


const MY_ROUTES: Routes = [
    { path: '', redirectTo: 'jobs', pathMatch: 'full' }, 
    { path: 'jobs', component: JobsComponent,children:[
        { path: 'details', component: JobDetailsComponent },   
    ]},
     { path: 'error', component: ErrorComponent },
     // A redirect route requires a pathMatch property to tell the router how to match a URL to the path of a route.
     // The default matching strategy of Angular router is
     // to match the redirect route when the URL begins with the redirect route's prefix path.
     // if 'prefix' all params/routes/xx will be redirected to homepage

    { path: 'jobs/posted', component: JobsPostedComponent, children:[

    ]},

    { path: 'jobs/posted/candidates', component: CandidatesComponent, children:[
        {path: 'detail', component: CandidateComponent}
    ]},



     // ** for all routes that we don't recognize,
     // Routes served from top to bottom so this should always come last!
     { path: '**', redirectTo: '/'}
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES);
