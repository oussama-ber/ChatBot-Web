import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


//modules 
import { AngularMaterialModule } from './components/angular-material.module';
 import { AuthModule } from './components/auth/auth.module';
// import { PostsModule } from './components/posts/posts.module';
// import { JobsModule } from './components/jobs/jobs.module';
// import { HomeModule } from './components/home/home.module';
import { SharedModule } from './components/shared-components/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    Ng2SearchPipeModule,
    // materials
    AngularMaterialModule,
    //posts 
    // PostsModule,
    //jobs 
    // JobsModule,
    //auth
  AuthModule,
    //home module fac-presentation, first-page, info.
    // HomeModule,
    //shared module 
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
