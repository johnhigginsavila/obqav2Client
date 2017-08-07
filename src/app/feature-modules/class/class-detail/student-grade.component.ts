import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Uploader } from '../../../shared/services/uploader.service';
import { PagerService } from '../../../shared/services/pager.service';

import { StudentGradeUploadItem } from '../../../classes/upload/upload-student-grade';

import { ClassService } from '../../../shared/services/class.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { IClass } from '../../../interfaces/class.interface';
import { ISession } from '../../../interfaces/session.interface';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.css']
})
export class StudentGradeComponent implements OnInit {

  private myClass:IClass[];
    private getClass:Observable<IClass[]>;
    private getCsrf:Observable<any>;
    private program:number;
    private session:ISession;
    private user:IUser;
    private classId:number;

    private classStudent:any[];
    private allItems:any[];
    pager:any = {};
    pagedItems:IClass[];
    page:number;

    constructor(private authenticationService:AuthenticationService,private route:ActivatedRoute, private classService:ClassService,private router:Router, private uploaderService:Uploader, private pagerService: PagerService){
        let id:number;
        let instructor:number;
        this.route.params.subscribe(params=> {id = params.id; instructor = params.instructor});
        this.getClass = this.classService.GetClassById(id, instructor);
        this.getCsrf = this.authenticationService.RequestCsrfToken();
    }
    ngOnInit(){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.user = this.session.User;
        this.getClass
        .subscribe(
           data => {
                this.myClass = data;
                this.classId = this.myClass[0].id;
                this.classStudent = data[0].classStudent;
                this.setPage(this.page);
           },
           error => console.log(error),
           () => console.log(this.myClass)
        )
    }

    onUploadFile(){

        let subscriber = this.getCsrf.subscribe(
            data => {
                let uploadFile = (<HTMLInputElement>window.document.getElementById('my-file-selector')).files[0];

                let studentGradeUploadItem:any = new StudentGradeUploadItem(uploadFile);
                studentGradeUploadItem.name = 'file';
                studentGradeUploadItem.formData = { FormDataKey:'file', program:this.user.program, user:this.user, classId:this.classId, _csrf:data._csrf};

                this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                    console.log(response)
                }

                this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                    console.log('error')
                }

                this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
                    console.log(response);
                }

                this.uploaderService.upload(studentGradeUploadItem);
            }
        )
        setTimeout(function() {
            subscriber.unsubscribe();
        }, 5000);
    }

    private getStudentGrade(data:any) {
        return data = data[0].classStudent;
    }
    setPage(page:number){
        if(page < 1 || page > this.pager.totalPages){
            return;
        }
    
        // get pager object from service
        this.pager = this.pagerService.getPager(this.classStudent.length, page);
        console.log(this.pager);
        //get current page of items
        this.pagedItems = this.classStudent.slice(this.pager.startIndex , this.pager.endIndex + 1);
        this.page = page;
        console.log(this.pagedItems);
    }

}
