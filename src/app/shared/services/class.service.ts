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

import { AuthenticationService } from '../../shared/services/authentication.service';
import { ISession } from '../../interfaces/session.interface';
import { IClass } from '../../interfaces/class.interface';
import {BaseUrl} from '../api-url/api-url';


@Injectable()

export class ClassService {
    private classFindUrl:string = BaseUrl.globalBaseUrl + 'class';
    private classFindProgramUrl:string = BaseUrl.globalBaseUrl + 'class/findprogram';
    private classFindOneUrl:string = BaseUrl.globalBaseUrl + 'class/:id';
    private classCreateUrl:string = BaseUrl.globalBaseUrl + 'class/create';
    private jwt:string;
   
    private session:ISession;
    constructor(private http:Http, private authenticationService:AuthenticationService){
        
    }

    

    GetAllClasses():Observable<IClass[]>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization','Bearer ' + this.jwt);
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.classFindUrl, options)
            .map(response => response.json())
    }

    GetClassesPerProgramPerCyclePerTerm(program:number, cycle:number, term:number):Observable<IClass[]>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization','Bearer ' + this.jwt);
        headers.append('program',program.toString());
        headers.append('cycle', cycle.toString());
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.classFindProgramUrl, options)
            .map(response => response.json())
            .map(data => this.filterClassesByTerm(data, term))
            .map((data) => {
                        if(data.length == 0){
                            let newData:any[] = [];
                            let dummyClassData:IClass = {
                                academicYear :'',
                                assessmentClass : null,
                                classStudent : [{}],
                                description : '',
                                cycle:null,
                                id : 0,
                                programCourse : null,
                                room : null,
                                term : null,
                                user : null
                            }
                            newData.push(dummyClassData);
                            
                            return newData;
                        }else{
                            return data;
                        }
                    })
    }

    GetClassesPerProgram(program:number):Observable<IClass[]>{
        return this.GetAllClasses()
                    .map(data => this.filterClassByProgram(data, program))
    }

    GetFacultyClasses(program:number,cycle:number,term:number, instructor:number):Observable<IClass[]>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.jwt);
        headers.append('program',program.toString());
        headers.append('cycle', cycle.toString());
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.classFindProgramUrl, options)
            .map(response => response.json())
            .map(data => this.filterClassesByTerm(data, term))
            .map(data => this.getFacultyClasses(data, instructor))

    }

    GetClassById(id:number, instructor:number):Observable<IClass[]>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization','Bearer ' + this.jwt);
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.classFindUrl+"/"+instructor+"/"+id, options)
            .map(response => response.json())
            .map(data => this.getClassByIdSorter(data))
    }

    AddClass(newClass: any):Observable<any>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization','Bearer ' + this.jwt);
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.post(this.classCreateUrl, newClass, options)
            .map(response => response.json())
    }

   

    private getFacultyClasses(data:any[], instructor:number):any{
        if(data.length == 0){
            return data;
        }else{
            let newData:any[] = [];
            data.forEach((item:any, index:number, array:any[]) => {
                if(item.user.id == instructor){
                    newData.push(item);
                }
            })
            return newData;
        }
    }

    private filterClassesByTerm(data:any[], term:number):any[]{
        if(term == 0){
            return data;
        }else{
            let newData:any[] = [];
            data.forEach((item:any, index:number, array:any[]) => {
                if(item.term == term){
                    newData.push(item)
                }
            })
            return newData;
        }
    }

    

    private getClassByIdSorter(data:any[]):any{
        data.forEach(dataSorter)
        return data;
        function dataSorter(item:any, index:number, array:any[]){
            array[index].assessmentClass.sort((a:any, b:any)=>{
                if(a.assessment.programSopi.sopi.sopiCode < b.assessment.programSopi.sopi.sopiCode){
                    return -1;
                }else if(a.assessment.programSopi.sopi.sopiCode > b.assessment.programSopi.sopi.sopiCode){
                    return 1;
                }else{
                    return 0;
                }
            })
        }
    }

    private filterClassByProgram(data:any[], program:number):any[]{
        let newData:any[] = [];
        data.forEach((item:any, index:number, array:any[]) => {
            if(item.programCourse.program == program){
                newData.push(item);
            }
        })
        return newData;
    }
    
}