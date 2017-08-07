import { Injectable } from '@angular/core';
import { Http, Response, Request, Jsonp, URLSearchParams, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

import {ISession} from '../../interfaces/session.interface';
import { BaseUrl } from '../api-url/api-url';

@Injectable()

export class SessionService {
    private session:ISession /*= JSON.parse(localStorage.getItem('session'))*/;
    private _sessionCreateUrl:string = BaseUrl.globalBaseUrl + 'session/create';

    constructor(private _http: Http, private jsonp: Jsonp, private _router:Router){

    }

   

    SessionCall(userCredentials:any):Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions(headers);
          return this._http.post(this._sessionCreateUrl, userCredentials,{withCredentials:true})
    }

    /*SessionCreate2(userCredentials:any){
      return this.SessionCall(userCredentials)
              .map(response => response.json())
              .subscribe(
                data => localStorage.setItem('session',JSON.stringify(data)),
                error => this._router.navigate(['session/new']),
                () => this._router.navigate(['class'])
              )
              
    }*/
    SessionCreate2(userCredentials:any){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({headers:headers,withCredentials:true,});
      return this._http.post(this._sessionCreateUrl, userCredentials, options)
        .map(request => request.json()) 
    }

    

    SessionCreate(userCredentials:any): Promise<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions(headers);
      return this._http.post(this._sessionCreateUrl, userCredentials, options)
                .toPromise()
                .then(response => localStorage.setItem('session', JSON.stringify(response.json())))
                .then(()=> this._router.navigate(['home']))
                .then(()=>window.location.reload())
                .catch(err => this._router.navigate(['session/new']))
    }   

    SessionDestroy(){
      this.clearLocalStorage().then(()=>this._router.navigate(['home']))
    }


    SetSession(session:ISession){
      this.session = session;
      console.log(this.session);
    }

    /*SetSession(data:ISession):Promise<any>{
      let promise = new Promise(function(resolve, reject){
        if(!data){
          reject([{error:'SetSessionError', message:'The data is invalid'}]);
        }else{
          this.session = data;
          console.log(data);
          resolve(data);
        }  
      })
      return promise;
    }*/

    private clearLocalStorage():Promise<any>{
      let promise = new Promise(function(resolve,reject){
        localStorage.clear();
        resolve();
      })
      return promise;
    }

    private extractData(res: Response):any{
        let body = res.json();
        return body.data || {};
    }

    private handleError (error: Response | any) :any {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}