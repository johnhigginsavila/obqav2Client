import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Uploader } from '../../../shared/services/uploader.service';
import { AssessmentUploadItem } from '../../../classes/upload/upload-assessment';

import { AssessmentService } from '../../../shared/services/assessment.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';

import { IAssessment } from '../../../interfaces/assessment.interface';
import { IAssessmentNew } from '../../../interfaces/assessment-new.interface';
import { ISession } from '../../../interfaces/session.interface';


@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css']
})
export class AddAssessmentComponent implements OnInit {

  assessmentNewForm:FormGroup;
    private assessmentNew:IAssessmentNew;
    private session:ISession;
    private program:number;
    private getCsrf:Observable<any>;
    private jwt:string;

    constructor(private authenticationService:AuthenticationService, private formBuilder:FormBuilder, private assessmentService:AssessmentService, private uploaderService:Uploader ){
        this.getCsrf = this.authenticationService.RequestCsrfToken();
        this.assessmentNewForm = this.formBuilder.group({
            sopi: new FormControl('',Validators.required),
            course: new FormControl('',Validators.required),
            assessmentLevel: new FormControl('',Validators.required),
            assessmentTask: new FormControl('',Validators.required),
            passingGrade: new FormControl('',Validators.required),
            target: new FormControl('',Validators.required),
            term: new FormControl('', Validators.required),
            academicYear: new FormControl('',Validators.required),
            assessmentCycle: new FormControl('',Validators.required),
            program: new FormControl('',Validators.required),
            _csrf: new FormControl('', Validators.required)
        });
        

    }

    
    ngOnInit(){
        this.getCsrf
            .subscribe(
                data => {
                    this.session = JSON.parse(localStorage.getItem('session'));
                    this.program = this.session.User.program;
                    this.assessmentNewForm = this.formBuilder.group({
                        sopi: new FormControl('',Validators.required),
                        course: new FormControl('',Validators.required),
                        assessmentLevel: new FormControl('',Validators.required),
                        assessmentTask: new FormControl('',Validators.required),
                        passingGrade: new FormControl('',Validators.required),
                        target: new FormControl('',Validators.required),
                        term: new FormControl('', Validators.required),
                        academicYear: new FormControl('',Validators.required),
                        assessmentCycle: new FormControl('',Validators.required),
                        program: new FormControl(this.session.User.program),
                        _csrf: new FormControl(data._csrf, Validators.required)
                    });
                }
            )
    }
    

    onSubmit(){
    
        this.assessmentNew = this.assessmentNewForm.value;
        this.assessmentService.CreateAssessment(this.assessmentNew)
            .subscribe(
                data => {console.log(data); this.ngOnInit},
                error => console.log(error)
            )
        //console.log(this.assessmentNew);

    }

    onUploadFile(){
        this.getCsrf
            .subscribe(
                data => {
                    this.session = JSON.parse(localStorage.getItem('session'));
                    this.jwt = this.session.token;
                    let uploadFile = (<HTMLInputElement>window.document.getElementById('file')).files[0];

                    let sopiUploadItem:any = new AssessmentUploadItem(uploadFile);
                    sopiUploadItem.headers = {'Authorization':'Bearer '+this.jwt};
                    sopiUploadItem.name = 'file';
                    sopiUploadItem.formData = { FormDataKey:'file', program:this.program, _csrf:data._csrf};

                    this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                        console.log(response)
                    }
                    this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                        console.log('error')
                    }
                    this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
                        console.log(response);
                    }
                    this.uploaderService.upload(sopiUploadItem);
                },
                error => console.log(error)
            )
                
    }

}
