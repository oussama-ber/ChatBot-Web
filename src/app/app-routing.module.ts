import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthAdmin } from './components/auth/auth.admin';
import { AuthGuard } from './components/auth/auth.guard';
import { FirstPageComponent } from './components/home/first-page/first-page.component';


//modules 
// import { PostsModule } from './components/posts/posts.module';
// import { AuthModule } from './components/auth/auth.module';
// import { JobsModule } from './components/jobs/jobs.module';
// import { HomeModule } from './components/home/home.module';
// import { SharedModule } from './components/shared-components/shared.module';

const routes: Routes = [

  {path: 'auth' ,   loadChildren: () => import('../app/components/auth/auth.module').then(m => m.AuthModule)},
  {path: 'home' ,   loadChildren: () => import('../app/components/home/home.module').then(m => m.HomeModule)},
  {path: '', component: FirstPageComponent}
  
  //posts (done)
  // { path: 'events', component: PostListComponent },
  // { path: 'create', component: PostCreateComponent, canActivate: [AuthAdmin]},
  // { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthAdmin] },
  // { path: 'getUser/:postId', component: AttendencyComponent, canActivate: [AuthGuard] },
  // { path: 'post/:postId', component: PostDetailsComponent },


  // ineeeeeeeeeeeees wtf is this !!!! footer amletilha path !!! 
  // { path: 'footer', component: FooterComponent },

  //jobs(done).
  // { path: 'showJob', component: JobListComponent, canActivate: [AuthAdmin] },
  // { path: 'showCv', component: CvListComponent, canActivate: [AuthAdmin] },
  // { path: 'createJob', component: JobCreateComponent},
  // { path: 'editJob/:jobId', component: JobCreateComponent, canActivate: [AuthAdmin] },
  // { path: 'job/:jobId', component: JobDetailComponent, canActivate: [AuthGuard] },
  // { path: 'validJobs', component: AvailableJobListComponent, canActivate: [AuthGuard] },
  // { path: 'jobApply/:jobId', component: JobApplyComponent, canActivate: [AuthGuard] },
  // //change the passport in auth or create an independent module for passport.
  // { path: 'me', component: PassportComponent, canActivate: [AuthGuard] },
  // { path: 'passport', component:   PassportFirstPageComponent  , canActivate: [AuthGuard] },

  //auth (done).
  // { path: 'signup', component: SignupComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'reset', component: AfterResetPasswordComponent },
  // { path: 'profile', component: ProfileComponent},
  // { path: 'verify/:secretToken', component: VerifyComponent },
  // { path: 'resetpassword/:passwordToken', component: ResetpasswordComponent },
  // { path: 'emailresetpassword', component: EmailresetpasswordComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  
  
  
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AuthAdmin]
})
export class AppRoutingModule { }
