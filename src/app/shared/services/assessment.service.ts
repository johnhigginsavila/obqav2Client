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


import { IAssessment } from '../../interfaces/assessment.interface';
import { IAssessmentNew } from '../../interfaces/assessment-new.interface';
import { IAssessmentStatus } from '../../interfaces/assessment-status.interface';
import { IAssessmentReport } from '../../interfaces/assessment-report.interface';
import { ISopiReport } from '../../interfaces/sopi-report.interface';
import { ISession } from '../../interfaces/session.interface';

import { AuthenticationService } from './authentication.service';

import {BaseUrl} from '../api-url/api-url';
@Injectable()

export class AssessmentService {
    private assessmentFindUrl: string = BaseUrl.globalBaseUrl + 'assessment/find';
    private assessmentFindOneUrl: string = BaseUrl.globalBaseUrl + 'assessment/findOne';
    private assessmentCreateUrl: string = BaseUrl.globalBaseUrl + 'assessment/create';
    private assessmentReportSummaryUrl: string = BaseUrl.globalBaseUrl + 'obqamonitoringreport/statussummary';
    private assessmentReportPerProgramUrl: string = BaseUrl.globalBaseUrl + 'obqamonitoringreport/statusperprogram';
    private addImprovementPlanUrl: string = BaseUrl.globalBaseUrl + 'assessment/update';
    private session: ISession;
    private jwt: string;
    private obqaMonitoringReportUrl: string = BaseUrl.globalBaseUrl + 'obqamonitoringreport/reportperprogram';
    private obqaMonitoringCycleReportUrl: string = BaseUrl.globalBaseUrl + 'obqamonitoringreport/cyclereport';
constructor(private http:Http, private authenticationService:AuthenticationService){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
    }


    GetAssessment():Observable<IAssessment[]>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({headers:headers,withCredentials:true});
        headers.append('Authorization', 'Bearer ' + this.jwt);
        return this.http.get(this.assessmentFindUrl, options)
            .map(response => response.json())
            .map((data) => {
                return data.sort((a:any, b:any)=>{
                    var sopiA = a.programSopi.sopi.sopiCode.toLowerCase();
                    var sopiB = b.programSopi.sopi.sopiCode.toLowerCase();
                    if(sopiA < sopiB){
                        return -1;
                    }else if(sopiA > sopiB){
                        return 1;
                    }else{
                        return 0;
                    }
                })
                
            })
            
            
    }
    GetAssessmentPerProgram(program:number, cycle:number, term:number):Observable<IAssessment[]>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const myprogram: number = this.session.User.program;
        headers.append('Authorization', 'Bearer ' + this.jwt);
        headers.append('program',program.toString());
        headers.append('cycle', cycle.toString());
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.assessmentFindOneUrl, options)
            .map(response => response.json())
            .map((data) => {
                return data.sort((a:any, b:any)=>{
                    var sopiA = a.programSopi.sopi.sopiCode.toLowerCase();
                    var sopiB = b.programSopi.sopi.sopiCode.toLowerCase();
                    if(sopiA < sopiB){
                        return -1;
                    }else if(sopiA > sopiB){
                        return 1;
                    }else{
                        return 0;
                    }
                })
                
            })
            .map(data => this.filterAssessmentByTerm(data, term))
            .map(data => {
                if(data.length == 0){
                    let newData:IAssessment[] = [];
                    let dummyAssessment:IAssessment = {
                        academicYear : '',
                        assessmentClass : undefined,
                        assessmentComment :'',
                        assessmentCycle : 0,
                        assessmentLevel : null,
                        assessmentTask : '',
                        id : null,
                        improvementPlan : '',
                        passingGrade : null,
                        program : undefined,
                        programCourse : undefined,
                        programSopi : undefined,
                        target : null,
                    }
                        
                    newData.push(dummyAssessment);
                    return newData;
                }else{
                    return data;
                }
            })
            
            
    }

    GetAssessmentPerProgramPerCycle(program:number, cycle:number, term:number):Observable<IAssessment[]>{
        return this.GetAssessment()
                    .map(data => this.filterAssessmentByTerm(data, term))
                    .map(data => this.filterAssessmentByCycle(data, cycle))
                    .map(data => {
                        if(data.length == 0){
                            let newData:IAssessment[] = [];
                            let dummyAssessment:IAssessment = {
                                academicYear : '',
                                assessmentClass : undefined,
                                assessmentComment :'',
                                assessmentCycle : 0,
                                assessmentLevel : null,
                                assessmentTask : '',
                                id : null,
                                improvementPlan : '',
                                passingGrade : null,
                                program : undefined,
                                programCourse : undefined,
                                programSopi : undefined,
                                target : null,
                            }
                                
                            newData.push(dummyAssessment);
                            return newData;
                        }else{
                            return data;
                        }
                    })
                    
    }

    CreateAssessment(assessment:IAssessmentNew):Observable<IAssessment[]>{


        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const myprogram: number = this.session.User.program;
        headers.append('Authorization', 'Bearer ' + this.jwt);
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.post(this.assessmentCreateUrl,assessment,options)
                .map(response => response.json())

    }

    GetAssessmentStatusSummary(cycle:number,_csrf:string):Observable<any>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const myprogram: number = this.session.User.program;
        headers.append('Authorization', 'Bearer ' + this.jwt);
        headers.append('cycle', cycle.toString());
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.post(this.assessmentReportSummaryUrl,{cycle:cycle,_csrf:_csrf}, options)
            .map(response => response.json())
            
    }


    GetAssessmentStatusPerProgram(cycle:number, _csrf:string):Observable<any[]>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const myprogram: number = this.session.User.program;
        headers.append('Authorization', 'Bearer ' + this.jwt);
        headers.append('cycle', cycle.toString());
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.post(this.assessmentReportPerProgramUrl,{cycle:cycle, _csrf:_csrf}, options)
            .map(response => response.json())
            
    }

    GetObqaMonitoringReport():Observable<IAssessmentReport[]>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const myprogram: number = this.session.User.program;
        headers.append('Authorization', 'Bearer ' + this.jwt);
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.obqaMonitoringReportUrl, options)
            .map(response => response.json())
            .map((data) => {
                return data.sort((a:any, b:any)=>{
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
    }
    GetObqaMonitoringReportPerProgramPerCyclePerTerm(program:number, cycle:number, term:number):Observable<IAssessmentReport[]>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization','Bearer ' + this.jwt);
        headers.append('program',program.toString());
        headers.append('cycle',cycle.toString());
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.obqaMonitoringReportUrl, options)
                    .map(response => response.json())
                    .map(data => this.filterAssessmentByTerm(data, term))
                    .map(data => this.sortCycleReportBySopi(data))
                    .map((data) => {
                        if(data.length == 0){
                            let newData:any[] = [];
                            let dummyAssessmentReport:IAssessmentReport ={
                                id:null,
                                assessmentCycle:0,
                                grade:null,
                                program:null,
                                programSopi:'',
                                sopi:'',
                                programCourse:null,
                                passingGrade:null,
                                performance:null,
                                academicYear:'',
                                assessmentComment:'',
                                assessmentLevel:null,
                                assessmentTask:'',
                                course:'',
                                target:null,
                                improvementPlan:'',
                                term:null
                            }
                            newData.push(dummyAssessmentReport);
                            return newData;
                        }else{
                            return data;
                        }
                    })
    }

    GetObqaMonitoringReportPerProgram(cycle:number, program:number):Observable<IAssessmentReport[]>{
        return this.GetObqaMonitoringReport()
                    .map((data) => this.filterAssessmentPerProgram(data, program))
                    .map((data) => this.filterAssessmentByCycle(data, cycle))
                    .map((data) => {
                        if(data.length == 0){
                            let newData:any[] = [];
                            let dummyAssessmentReport:IAssessmentReport ={
                                id:null,
                                assessmentCycle:0,
                                grade:null,
                                program:null,
                                programSopi:'',
                                sopi:'',
                                programCourse:null,
                                passingGrade:null,
                                performance:null,
                                academicYear:'',
                                assessmentComment:'',
                                assessmentLevel:null,
                                assessmentTask:'',
                                course:'',
                                target:null,
                                improvementPlan:'',
                                term:null
                            }
                            newData.push(dummyAssessmentReport);
                            return newData;
                        }else{
                            return data;
                        }
                    })
    }

    GetCycleReportData(program:number):Observable<any[]>{
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const myprogram: number = this.session.User.program;
        headers.append('Authorization', 'Bearer ' + this.jwt);
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.obqaMonitoringCycleReportUrl, options)
                .map(data => data.json())
                .map(data => this.filterCycleReportByProgram(data,program))
                .map(data => this.sortCycleReportBySopi(data))
    }

    AddImprovementPlan(assessmentId:number, improvementPlan:string, _csrf:string){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const myprogram: number = this.session.User.program;
        headers.append('Authorization', 'Bearer ' + this.jwt);
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.post(this.addImprovementPlanUrl, {assessmentId:assessmentId, improvementPlan:improvementPlan, _csrf:_csrf}, options)
            .map(response => response.json())
    }

    
    private filterAssessmentPerProgram(data:any[], program:number):any[]{
        let newData:any[] = [];
        data.forEach((item:any, index:number, array:any[]) => {
            if(item.program.id == program){
                newData.push(item);
            }
        })
        return newData;
    }
    private filterCycleReportByProgram(data:any[], program:number):any[]{
        let newData:any[] = [];
        data.forEach((item:any, index:number, array:any[]) => {
            if(item.program == program){
                newData.push(item);
            }
        })
        return newData;
    }
    private filterAssessmentByCycle(data:any[], cycle:number):any[]{
        let newData:any[] = [];
        data.forEach((item:any, index:number, array:any[]) => {
            if(item.assessmentCycle == cycle){
                newData.push(item);
            }
        });
        return newData;
    }
    private filterAssessmentByTerm(data:any[], term:number):any[]{
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
    private getAssessmentStatus(data:any[], cycle:number):any{
        sortAssessment(data, cycle)
        .then(function(result){
            setTimeout(function(){
                return result;
            }, 300)
        }).catch(function(err){
            console.log(err);
        })
            
            
        function sortAssessment(data:any[], cycle:number){

            var promise = new Promise(function(resolve, reject){
                let newData:any = {
                    term1:[],
                    term2:[],
                    term3:[]
                }

                data.forEach(sorter);
                setTimeout(function(){
                    resolve(newData);
                }, 100)

                function sorter(item:any, index:number, array:any[]){
                    if(array[index].assessmentCycle == 1){
                        newData.term1.push(array[index]);
                    }else if(array[index].assessmentCycle == 2){
                        newData.term2.push(array[index]);
                    }else{
                        newData.term3.push(array[index]);
                    }
                }
            })

            return promise;
        }

        
    }
    private sortCycleReportBySopi(data:any[]):any[]{
        data.sort((a:any, b:any ) => {
            let sopiA = a.sopi;
            let sopiB = b.sopi;
            if(sopiA > sopiB){
                return 1;
            }else if(sopiA < sopiB){
                return -1;
            }else {
                return 0;
            }
        })
        return data;
    }
  
        


}