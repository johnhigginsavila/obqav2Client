import { AddStudentComponent } from '../feature-modules/class/add-student/add-student.component';
import { ClassDetailComponent } from '../feature-modules/class/class-detail/class-detail.component';
import { EvidenceComponent } from '../feature-modules/class/evidence/evidence.component';
import { StudentGradeComponent } from '../feature-modules/class/class-detail/student-grade.component';

import { LoginGuard } from '../shared/guards/login.guard';
import { ClassGuard } from '../shared/guards/class.guard';

export const classRouterConfig = [
    { path: 'class/add-student', component: AddStudentComponent, canActivate: [LoginGuard] },
    { path: 'class/:instructor/:id', component: ClassDetailComponent, canActivate: [LoginGuard, ClassGuard] },
    { path: 'class/student-grade/:instructor/:id', component: StudentGradeComponent, canActivate: [LoginGuard, ClassGuard] },
    { path: 'class/evidence/:instructor/:id', component: EvidenceComponent, canActivate: [LoginGuard, ClassGuard] }
 
];