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

import { IUser } from '../../interfaces/user.interface';
import { BaseUrl } from '../api-url/api-url';

@Injectable()

export class UserService {
    private _userUrl = BaseUrl.globalBaseUrl + 'user';

    constructor(private _http: Http, private jsonp: Jsonp){}

    GetAllUsers(): Observable<IUser[]>{
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this._http.get(this._userUrl, options)
            .map((response: Response) => <IUser[]> response.json())
            .catch(this.handleError);
    }
    GetUsersPerProgram(program:number):Observable<IUser[]>{
        return this.GetAllUsers()
                .map(data => this.filterByProgram(data, program))
    }

    GetFacultyUser():Observable<IUser[]>{
        return this.GetAllUsers()
            .map(data => this.getFacultyData(data))
    }

    addUser(userCredentials:any):Observable<any>{

        userCredentials.program = this.program(userCredentials.program);
        userCredentials.userRestriction = this.userRestriction(userCredentials.userRestriction);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({headers:headers,withCredentials:true});

        return this._http.post('user/create', userCredentials, options)
            .map(response => response.json())
    }

    private filterByProgram(data:any[], program:number):any[]{
        let newData:any[] = [];
        data.forEach((item:any, index:number, array:any[]) => {
            if(item.program.id == program){
                newData.push(item);
            }
        })
        return newData;
    }

    
    private getFacultyData(data:any[]):any{
        
        function facultyData(item:any, index:number, array:any[]){
            if (array[index].program === undefined){
                delete array[index];
            }
        }
        data.forEach(facultyData);
        return data = data.filter(function (element) {
            return element !== undefined;
        })
    }
    private userRestriction(userRestriction:string) : number{
        switch(userRestriction.toLowerCase()){
            case "admin":{
                return 1;
            }
            case "director":{
                return 2;
            }
            case "assisstantadminstaff":{
                return 3;
            }
            case "coordinator":{
                return 4;
            }
            case "faculty":{
                return 5;
            }
            default:{
                return 6;
            }
        } 
    }

    private program(program:string) : number{
        switch(program.toLowerCase()){
            case "che":{
                return 1;
            }
            case "civ":{
                return 2;
            }
            case "cpe":{
                return 3;
            }
            case "ece":{
                return 4;
            }
            case "ie":{
                return 5;
            }
            case "mem":{
                return 6;
            }
            case "me":{
                return 7;
            }
            default:{
                return 8;
            }
        } 
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}