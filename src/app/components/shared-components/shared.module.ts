import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularMaterialModule } from '../angular-material.module';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { Footer2Component } from './footer2/footer2.component';
import { HeaderComponent } from './header/header.component';
import { ValidationDialogComponent } from './validation-dialog/validation-dialog.component';
const routes: Routes = [

];
@NgModule({
    declarations:[
        HeaderComponent,
        FooterComponent,
        Footer2Component,
        ErrorComponent,
        ValidationDialogComponent

    ],
    entryComponents:[ValidationDialogComponent], 
    imports:[
        CommonModule,
        ReactiveFormsModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        RouterModule.forChild(routes),
        AngularMaterialModule,
        Ng2SearchPipeModule,
     
    ], 
    exports:[
        HeaderComponent,
        FooterComponent,
        Footer2Component,
        ErrorComponent,
        ValidationDialogComponent

    ]

})
export class SharedModule {}