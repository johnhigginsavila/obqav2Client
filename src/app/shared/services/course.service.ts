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

import { ISession } from '../../interfaces/session.interface';
import { IProgramCourse } from '../../interfaces/program-course.interface';
import { BaseUrl } from '../api-url/api-url';

@Injectable()

export class CourseService{
    private courseFindUrl:string = BaseUrl.globalBaseUrl + 'course';

    constructor(private http:Http){}
    GetAllCourses(): Observable<IProgramCourse[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.courseFindUrl, options)
            .map(response => response.json())
    }

    GetCoursesPerProgram(program:number):Observable<IProgramCourse[]>{
        return this.GetAllCourses()
            .map(data => this.filterCoursesByProgram(data, program))
            .map(data => this.sortByCourse(data))
    }

    private filterCoursesByProgram(data:any[], program:number):any[]{
        let newData:any[] = [];
        data.forEach((item:any, index:number, array:any[]) => {
            if(item.program == program){
                newData.push(item);
            }
        })
        return newData;
    }

    private sortByCourse(data:any[]):any[]{
        data.sort((a:any, b:any ) => {
            let courseA = a.course.courseCode;
            let courseB = b.course.courseCode;
            if(courseA > courseB){
                return 1;
            }else if(courseA < courseB){
                return -1;
            }else {
                return 0;
            }
        })
        return data;
    }
}