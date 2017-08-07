import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MainPipeModule } from '../../main-pipe/main-pipe.module';

import { AdminComponent } from './admin.component';
import { ManageAssessmentComponent } from './manage-assessment/manage-assessment.component';

import { AddAssessmentComponent } from './manage-assessment/add-assessment.component';
import { ManageClassesComponent } from './manage-classes/manage-classes.component';
import { AddClassComponent } from './manage-classes/add-class.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { AddCourseComponent } from './manage-courses/add-course.component';
import { ManageFacultyComponent } from './manage-faculty/manage-faculty.component';
import { ManageSopiComponent } from './manage-sopi/manage-sopi.component';
import { AddSopiComponent } from './manage-sopi/add-sopi.component';


import {adminRouterConfig} from '../../config/admin-router.config';

@NgModule({
    imports:
    [
        CommonModule,
        RouterModule.forChild(adminRouterConfig),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MainPipeModule
    ],
    declarations: [
        AdminComponent,
        ManageAssessmentComponent,
        AddAssessmentComponent,
        ManageClassesComponent,
        AddClassComponent,
        ManageCoursesComponent,
        AddCourseComponent,
        ManageFacultyComponent,
        ManageSopiComponent,
        AddSopiComponent
    ],
    providers: []
})

export class AdminModule {}