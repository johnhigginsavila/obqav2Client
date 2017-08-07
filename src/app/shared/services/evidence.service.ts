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
import { BaseUrl } from '../api-url/api-url';

import {IEvidence} from '../../interfaces/evidence.interface';

@Injectable()

export class EvidenceService {
    private evidenceFindUrl:string = BaseUrl.globalBaseUrl + 'evidence';
    private evidenceFindOneUrl:string = BaseUrl.globalBaseUrl + 'evidence/findOne';

    constructor(private http: Http, private jsonp: Jsonp, private router:Router){

    }

    GetAllEvidence():Observable<IEvidence[]>{
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.get(this.evidenceFindUrl, options)
            .map(response => response.json())
    }

    GetEvidenceByAssessmentClassIdAndDataDescription(assessmentClass:number, dataDescription:string, _csrf:string): Observable<IEvidence> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({headers:headers,withCredentials:true});
        return this.http.post(this.evidenceFindOneUrl,{assessmentClass:assessmentClass, dataDescription:dataDescription, _csrf:_csrf}, options)
            .map(response => response.json())
    }



}
