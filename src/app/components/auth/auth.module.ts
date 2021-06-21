import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared-components/shared.module';
import { AfterResetPasswordComponent } from './after-reset-password/after-reset-password.component';
import { EmailresetpasswordComponent } from './emailresetpassword/emailresetpassword.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes =[
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset', component: AfterResetPasswordComponent },
    { path: 'profile', component: ProfileComponent},
    { path: 'verify/:secretToken', component: VerifyComponent },
    { path: 'resetpassword/:passwordToken', component: ResetpasswordComponent },
    { path: 'emailresetpassword', component: EmailresetpasswordComponent },
] ; 
@NgModule({
    declarations:[
        SignupComponent,
        LoginComponent,
        VerifyComponent,
        ResetpasswordComponent,
        EmailresetpasswordComponent,
        AfterResetPasswordComponent,
        ProfileComponent,
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        RouterModule.forChild(routes),
        AngularMaterialModule,
        Ng2SearchPipeModule,
        SharedModule,


    ],
    exports:[
        RouterModule,

        // SignupComponent,
        // LoginComponent,
         VerifyComponent,
       ResetpasswordComponent,
        // EmailresetpasswordComponent,
        // AfterResetPasswordComponent,
        // ProfileComponent,
    ]
})
export class AuthModule {}