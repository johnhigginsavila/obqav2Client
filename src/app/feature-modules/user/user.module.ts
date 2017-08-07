import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { UserNewComponent } from './new/user-new.component';

import { UserService } from '../../shared/services/user.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpModule,
        JsonpModule
        
    ],
    declarations: [
        UserNewComponent
        
    ],
    providers: [UserService]
    
})

export class UserModule {

}