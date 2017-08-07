import { ManageAssessmentComponent } from '../feature-modules/admin/manage-assessment/manage-assessment.component';
import { AddAssessmentComponent } from '../feature-modules/admin/manage-assessment/add-assessment.component';
import { ManageClassesComponent } from '../feature-modules/admin/manage-classes/manage-classes.component';
import { AddClassComponent } from '../feature-modules/admin/manage-classes/add-class.component';
import { ManageFacultyComponent } from '../feature-modules/admin/manage-faculty/manage-faculty.component';
import { ManageCoursesComponent } from '../feature-modules/admin/manage-courses/manage-courses.component';
import { AddCourseComponent } from '../feature-modules/admin/manage-courses/add-course.component';
import { ManageSopiComponent } from '../feature-modules/admin/manage-sopi/manage-sopi.component';
import { AddSopiComponent } from '../feature-modules/admin/manage-sopi/add-sopi.component';


import { LoginGuard } from '../shared/guards/login.guard';
import { AuthorizeGuard } from '../shared/guards/authorize.guard';

export const adminRouterConfig = [
    { path: 'admin/manage-assessment', component: ManageAssessmentComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'admin/manage-assessment/add-assessment', component: AddAssessmentComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'admin/manage-classes', component: ManageClassesComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'admin/manage-classes/add-class', component: AddClassComponent , canActivate: [LoginGuard, AuthorizeGuard]},
    { path: 'admin/manage-faculty', component: ManageFacultyComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'admin/manage-courses', component: ManageCoursesComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'admin/manage-courses/add-course', component:AddCourseComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'admin/manage-sopi', component: ManageSopiComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'admin/manage-sopi/add-sopi', component: AddSopiComponent, canActivate: [LoginGuard, AuthorizeGuard] }
];