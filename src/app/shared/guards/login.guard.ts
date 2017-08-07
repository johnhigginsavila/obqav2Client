import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { ISession } from '../../interfaces/session.interface';

@Injectable()
export class LoginGuard implements CanActivate {
    private session:ISession;

    canActivate(){
        return this.isLogin();
    }

    private isLogin():boolean{
        this.session = JSON.parse(localStorage.getItem('session'));
        if(!this.session){
            console.log("LogInGuard: Please Login to continue");
        }else{
            return this.session.authenticated;
        }
    }

}