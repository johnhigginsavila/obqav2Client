
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';

import { ISession } from '../../interfaces/session.interface';
import {IClass } from '../../interfaces/class.interface';


@Injectable()
export class ClassGuard implements CanActivate {
    private session:ISession;
    private id:number;
    private confirmation:boolean;

    constructor(){
        this.session = JSON.parse(localStorage.getItem('session'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.id = this.session.User.id;
        console.log(route.params.instructor);
        if(this.id != route.params.instructor){
            console.log('ClassGuard: This is not your class');
        }else{
            return true;
        }
    }

    private isClassConfirmed(id:any){
        this.session = JSON.parse(localStorage.getItem('session'));
        
        
    }

}