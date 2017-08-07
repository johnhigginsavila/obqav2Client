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

import { IStudentChart } from '../../interfaces/student-chart.interface';
import { BaseUrl } from '../api-url/api-url';

@Injectable()

export class GradeService {
    private session:ISession;
    private jwt:string;
    private getGradeStatusSummaryUrl:string = BaseUrl.globalBaseUrl+ 'grade/statussummary';
    private getGradePerStudentUrl: string = BaseUrl.globalBaseUrl + 'grade/statusperstudent'; // students with grades sorted by program for average sopi grades
    constructor(private http:Http){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
    }


    GetGradeStatusSummary():Observable<any>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization','Bearer ' + this.jwt);
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.getGradeStatusSummaryUrl, options)
                    .map(response => response.json())
    }

    GetGradePerStudent():Observable<any>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization','Bearer ' + this.jwt);
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.getGradePerStudentUrl, options)
                    .map(response => response.json())
    }

    GetGradePerStudentToChart(program:number):Observable<any>{
        return this.GetGradePerStudent()
                    .map(data => this.filterPerProgram(data, program))
                    .map(data => this.sortPerSopi(data))
                    .map(data => this.formatData(data))
    }

    //functions for GetGradePerStudentToChart
    private filterPerProgram(data:any[], program:number):any[]{
        let newData:any[] = [];
        data.forEach((item:any, index:number, array:any[]) => {
            if(item.program === program){
                newData.push(item)
            }
        })
        return newData;
    }
    private sortPerSopi(data:any[]):any[]{
        data.forEach((item:any, index:number, array:any[]) => {
            item.grade.sort((a:any, b:any) => {
                var sopiA = a.sopi.toLowerCase();
                var sopiB = b.sopi.toLowerCase();
                if(sopiA < sopiB){
                    return -1;
                }else if(sopiA > sopiB){
                    return 1;
                }else{
                    return 0;
                }
            })
        })
        return data;
    }
    private formatData(data:any[]):IStudentChart[]{
        let newData:IStudentChart[];
        newData = [];
        data.forEach((item:any, index:number, array:any[]) => {
            let studentChart:IStudentChart;
            studentChart = {
                labels:[],
                data:{
                    data:[],
                    label:''
                }
            }
            studentChart.data.label = item.studentNumber + ' - ' + item.lastname;
            item.grade.forEach((item1:any, index1:number, array1:any[]) => {
                studentChart.labels.push(item1.sopi);
                studentChart.data.data.push(item1.average * 100);
            })
            newData.push(studentChart);
        })
        return newData;
    }

}