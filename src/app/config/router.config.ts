import { HomeComponent } from '../feature-modules/home/home.component';
import { AdminComponent } from '../feature-modules/admin/admin.component';
import { ClassComponent } from '../feature-modules/class/class.component';
import { CurriculumMapComponent } from '../feature-modules/curriculum-map/curriculum-map.component';
import { DashboardComponent } from '../feature-modules/dashboard/dashboard.component';
import { SessionNewComponent } from '../feature-modules/session/session-new.component';
import { UserNewComponent } from '../feature-modules/user/new/user-new.component';

import { LoginGuard } from '../shared/guards/login.guard';
import { AuthorizeGuard } from '../shared/guards/authorize.guard';

export const routerConfig = [
    { path: 'home', component: HomeComponent},
    { path: 'admin', component: AdminComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'class', component: ClassComponent, canActivate: [LoginGuard]},
    { path: 'curriculum-map', component: CurriculumMapComponent, canActivate: [LoginGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard, AuthorizeGuard] },
    { path: 'session/new', component: SessionNewComponent },
    { path: 'user/new', component: UserNewComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full'},
];