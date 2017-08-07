import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { MainPipeModule } from '../../main-pipe/main-pipe.module';

import { ClassComponent } from './class.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { StudentGradeComponent } from './class-detail/student-grade.component';
import { EvidenceComponent } from './evidence/evidence.component';

import { classRouterConfig } from '../../config/class-router.config';

@NgModule({
    imports: [
        
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpModule,
        JsonpModule,
        RouterModule.forChild(classRouterConfig),
        MainPipeModule
        
    ],
    declarations: [
        ClassComponent,
        AddStudentComponent,
        ClassDetailComponent,
        EvidenceComponent,
        StudentGradeComponent
        
        
    ],
    providers: []
})

export class ClassModule {

}