import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { ISession } from '../../interfaces/session.interface';

@Injectable()
export class AuthorizeGuard implements CanActivate {
    private session:ISession;

    canActivate(){
        return this.isAuthorized();
    }

    private isAuthorized():boolean{
        this.session = JSON.parse(localStorage.getItem('session'));
        if(!this.session){
            console.log("AuthorizeGuard: Please Login to continue");
        }else if(this.session.User.userRestriction > 4){
            console.log("AuthorizeGuard: You are not allowed for this content!");
        }else{
            return true;
        }
    }

}