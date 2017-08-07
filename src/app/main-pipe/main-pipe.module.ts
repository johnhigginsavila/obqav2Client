import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentGradePipe } from './pipes/student-grade.pipe';
import { EvidenceAssessmentPipe } from './pipes/evidence-assessment.pipe';
import { AssessmentTargetPipe } from './pipes/assessment-target.pipe';

@NgModule({
    declarations: [ StudentGradePipe, EvidenceAssessmentPipe, AssessmentTargetPipe ],
    imports: [ CommonModule ],
    exports: [StudentGradePipe, EvidenceAssessmentPipe, AssessmentTargetPipe]
})

export class MainPipeModule{}