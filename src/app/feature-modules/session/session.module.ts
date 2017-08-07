import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import{ SharedModule } from '../../shared/shared.module';


import { SessionNewComponent } from './session-new.component';
import { AppComponent } from '../../app.component';

import { ISession } from '../../interfaces/session.interface';
import { IUser } from '../../interfaces/user.interface';

@NgModule({
    imports:[
        HttpModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {path: 'session/new',component: SessionNewComponent }
        ])
    ],
    declarations: [
        SessionNewComponent
    ],
    providers:[
    
    ]
})

export class SessionModule {
    
}