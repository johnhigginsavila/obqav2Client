import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Uploader } from '../../../shared/services/uploader.service';
import { ClassUploadItem } from '../../../classes/upload/upload-class';

import { AssessmentService } from '../../../shared/services/assessment.service';
import { IAssessment } from '../../../interfaces/assessment.interface';
import { IAssessmentNew } from '../../../interfaces/assessment-new.interface';
import { ISession } from '../../../interfaces/session.interface';

import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ClassService } from '../../../shared/services/class.service';
import { IClass } from '../../../interfaces/class.interface';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  private classNewForm:FormGroup;
    private program:number;
    private getCsrf:Observable<any>;
    private session:ISession;
    private jwt:string;

    constructor(private authenticationService:AuthenticationService,private formBuilder:FormBuilder, private classService:ClassService, private uploaderService:Uploader){
        let session:ISession = JSON.parse(localStorage.getItem('session'));
        this.program = session.User.program;
        this.classNewForm = this.formBuilder.group({
            course : new FormControl('',Validators.required),
            term : new FormControl('',Validators.required),
            academicYear : new FormControl('',Validators.required),
            firstnameInstructor : new FormControl('',Validators.required),
            lastnameInstructor : new FormControl('',Validators.required),
            program : new FormControl(this.program),
            cycle: new FormControl('',Validators.required),
            _csrf: new FormControl('',Validators.required)
        })
        this.getCsrf = this.authenticationService.RequestCsrfToken();
        this.session = JSON.parse(localStorage.getItem('session'));
        this.jwt = this.session.token;
    }
    
    ngOnInit(){
        this.getCsrf
            .subscribe(
                data => {
                    let session:ISession = JSON.parse(localStorage.getItem('session'));
                    this.program = session.User.program;
                    this.classNewForm = this.formBuilder.group({
                        course : new FormControl('',Validators.required),
                        term : new FormControl('',Validators.required),
                        academicYear : new FormControl('',Validators.required),
                        firstnameInstructor : new FormControl('',Validators.required),
                        lastnameInstructor : new FormControl('',Validators.required),
                        cycle: new FormControl('',Validators.required),
                        program : new FormControl(this.program),
                        _csrf: new FormControl(data._csrf,Validators.required)
                    })
                },
                error => console.log(error)
            )
                        
    }

    onSubmit(){
        let addClass = this.classService.AddClass(this.classNewForm.value)
            .subscribe(
                response => console.log(response),
                error => console.log(error),
                () => this.ngOnInit
            )
        setTimeout(function(){
            addClass.unsubscribe();
        }, 5000)
    }

    onUploadFile(){
        this.getCsrf.subscribe(
            data => {
                this.session = JSON.parse(localStorage.getItem('session'));
                this.jwt = this.session.token;
                let uploadFile = (<HTMLInputElement>window.document.getElementById('file')).files[0];
                let classUploadItem:any = new ClassUploadItem(uploadFile);
                classUploadItem.headers = {'Authorization':'Bearer '+this.jwt};
                classUploadItem.name = 'file';
                classUploadItem.formData = { FormDataKey:'file', program:this.program, _csrf:data._csrf};

                this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                    console.log(response)
                }

                this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                    console.log('error')
                }

                this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
                    console.log(response);
                    this.ngOnInit();
                }

                this.uploaderService.upload(classUploadItem);
            },
            error => console.log(error)
        )
    }

}
