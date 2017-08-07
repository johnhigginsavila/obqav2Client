import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Uploader } from '../../../shared/services/uploader.service';
import { CourseUploadItem } from '../../../classes/upload/upload-course';


import { AuthenticationService } from '../../../shared/services/authentication.service';
import { CourseService } from '../../../shared/services/course.service';
import { ICourseNew } from '../../../interfaces/course-new.interface';
import { ISession } from '../../../interfaces/session.interface';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  private courseNewForm: FormGroup;
    private courseNew: ICourseNew;
    private session:ISession;
    private program:number;
    private getCsrf:Observable<any>;

    constructor(private authenticationService:AuthenticationService,private formBuilder: FormBuilder, private courseService: CourseService, private uploaderService:Uploader) {
        this.courseNewForm = this.formBuilder.group({
            courseCode: new FormControl('', Validators.required),
            courseName: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            _csrf: new FormControl('',Validators.required)
        });

        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.getCsrf = this.authenticationService.RequestCsrfToken();
        
    }
    ngOnInit() {
        
        this.getCsrf.subscribe(
            data => {
                this.courseNewForm = this.formBuilder.group({
                    courseCode: new FormControl('', Validators.required),
                    courseName: new FormControl('', Validators.required),
                    description: new FormControl('', Validators.required),
                    program: new FormControl(this.program),
                    _csrf:new FormControl(data._csrf, Validators.required)
                });
            },
            error => console.log(error)
        )
    }
    onSubmit() {
        this.courseNew = this.courseNewForm.value;
        console.log(this.courseNew);
    }

    uploadFile(){
        this.getCsrf.subscribe(
            data => {
                let uploadFile = (<HTMLInputElement>window.document.getElementById('file')).files[0];

                let courseUploadItem:any = new CourseUploadItem(uploadFile);
                courseUploadItem.name = 'file';
                courseUploadItem.formData = { FormDataKey:'file', program:this.program, _csrf:data._csrf};

                this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                    console.log(response)
                }

                this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                    console.log('error')
                }

                this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
                    console.log(response);
                }

                this.uploaderService.upload(courseUploadItem);
            },
            error => console.log(error)
        )
    }

}
