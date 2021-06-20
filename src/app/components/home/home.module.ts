import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthGuard } from '../auth/auth.guard';

import { SharedModule } from '../shared-components/shared.module';
import { AlumniComponent } from './fac-presentation/alumni/alumni.component';
import { MissionComponent } from './fac-presentation/mission/mission.component';
import { NetworkComponent } from './fac-presentation/partnership/network/network.component';
import { ParnerComponent } from './fac-presentation/partnership/parner/parner.component';
import { PartnershipsComponent } from './fac-presentation/partnership/partnerships/partnerships.component';
import { StudentsComponent } from './fac-presentation/students/students.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { InfoComponent } from './info/info.component';
import { VisionComponent } from './fac-presentation/vision/vision.component';
import { WorkshopsComponent } from './fac-presentation/workshops/workshops.component';
import { CareerPassportComponent } from './fac-presentation/career-passport/career-passport.component';
import { SmuIncubatorComponent } from './fac-presentation/smu-incubator/smu-incubator.component';
import { JobfairComponent } from './fac-presentation/jobfair/jobfair.component';
import { TestimonialComponent } from './fac-presentation/testimonial/testimonial.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

const routes: Routes = [
    { path: 'dashboard', component: FirstPageComponent },
    { path: '', component: FirstPageComponent },

    { path: 'workshops', component: WorkshopsComponent },
    { path: 'vision', component: VisionComponent },
    { path: 'mission', component: MissionComponent },
    { path: 'alumni', component: AlumniComponent },
    { path: 'students', component: StudentsComponent },
    { path: 'jobfair', component: JobfairComponent },
    { path: 'incubator', component: SmuIncubatorComponent },
    { path: 'careerpassport', component: CareerPassportComponent },
    { path: 'testimonial', component: TestimonialComponent },
    { path: 'chatroom', component: ChatroomComponent},



    { path: 'network', component: NetworkComponent, canActivate: [AuthGuard] },
    { path: 'becoming-partners', component: ParnerComponent, canActivate: [AuthGuard] },
    { path: 'partnerships', component: PartnershipsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    declarations:[
    FirstPageComponent,
    InfoComponent,
    MissionComponent,
    AlumniComponent,
    StudentsComponent,
    NetworkComponent,
    PartnershipsComponent,
    ParnerComponent,
    VisionComponent,
    WorkshopsComponent,
    CareerPassportComponent,
    SmuIncubatorComponent,
    JobfairComponent,
    TestimonialComponent,
    ChatroomComponent

    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        RouterModule.forChild(routes),
        AngularMaterialModule,
        SharedModule,

    ],
    exports:[
        InfoComponent,
        MissionComponent,
        AlumniComponent,
        StudentsComponent,
        NetworkComponent,
        PartnershipsComponent,
        ParnerComponent,
        FirstPageComponent,
        ChatroomComponent
    ]
})
export class HomeModule {}
