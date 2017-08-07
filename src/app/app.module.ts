/* Injection modules */
import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
/* Components*/
import { AppComponent } from './app.component';
import { HomeComponent } from './feature-modules/home/home.component';
import { LogInComponent } from './log-in.component';
/* Feature Modules */
import { SessionModule } from './feature-modules/session/session.module';
import { UserModule } from './feature-modules/user/user.module';
import { ClassModule } from './feature-modules/class/class.module';
import { AdminModule } from './feature-modules/admin/admin.module';
import { CurriculumMapModule } from './feature-modules/curriculum-map/curriculum-map.module';
import { DashboardModule } from './feature-modules/dashboard/dashboard.module';

import { SharedModule } from './shared/shared.module';


import { routerConfig } from './config/router.config';
/* Services */
import { SessionService } from './shared/services/session.service';
import { UserService } from './shared/services/user.service';
import { AuthenticationService } from './shared/services/authentication.service';
 
/* Guards */
import { LoginGuard } from './shared/guards/login.guard';
import { AuthorizeGuard } from './shared/guards/authorize.guard';
import { ClassGuard } from './shared/guards/class.guard';
/*Pipes*/
import { MainPipeModule } from './main-pipe/main-pipe.module';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routerConfig, { useHash: true }),
        ChartsModule,
        MainPipeModule,
        SharedModule.forRoot(),
        SessionModule,
        UserModule,
        ClassModule,
        AdminModule,
        CurriculumMapModule,
        DashboardModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports:[],
    declarations: [ AppComponent, HomeComponent, LogInComponent],
    providers: [ UserService, LoginGuard, AuthorizeGuard, ClassGuard],
    //providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap:    [AppComponent],
})
export class AppModule {

}
