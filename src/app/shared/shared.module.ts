import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { SessionService } from './services/session.service';
import { AssessmentService } from './services/assessment.service';
import { ClassService } from './services/class.service';
import { CourseService } from './services/course.service';
import { SopiService } from './services/sopi.service';
import { EvidenceService } from './services/evidence.service';
import { GradeService } from './services/grade.service';
import { PagerService } from './services/pager.service';
import { Uploader } from './services/uploader.service';




@NgModule({
    declarations: [],
    exports: [],
    imports: [CommonModule]
})

export class SharedModule {
    static forRoot() : ModuleWithProviders {
        return{
            ngModule : SharedModule,
            providers: [  SessionService, AuthenticationService, AssessmentService, ClassService, CourseService, SopiService,EvidenceService,GradeService, PagerService, Uploader]
        }
    }

}