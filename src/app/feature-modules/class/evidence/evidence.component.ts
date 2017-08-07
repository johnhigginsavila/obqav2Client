import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ClassService } from '../../../shared/services/class.service';
import { EvidenceService } from '../../../shared/services/evidence.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Uploader } from '../../../shared/services/uploader.service';
import { EvidenceUploadItem } from '../../../classes/upload/upload-evidence';

import { ISession } from '../../../interfaces/session.interface';
import { IClass } from '../../../interfaces/class.interface';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

  private myClass:IClass[];
    private getClass:Observable<IClass[]>;
    private program:number;
    private session:ISession;
    private user:IUser;
    private classId:number;
    private evidenceCode:any;
    private evidenceFileName:string;
    private finalEvidenceFileName:string;
    private getCsrf:Observable<any>;
    private getEvidence:Observable<any>;

    constructor(private authenticationService:AuthenticationService, private route:ActivatedRoute, private classService:ClassService,private router:Router, private uploaderService:Uploader, private sanitizer:DomSanitizer, private evidenceService:EvidenceService){
        
        let id:number;
        let instructor:number;
        this.route.params.subscribe(params=> {id = params.id; instructor = params.instructor});
        console.log(id)
        this.getClass = this.classService.GetClassById(id,instructor);
        this.finalEvidenceFileName = this.evidenceFileName;
        this.getCsrf = this.authenticationService.RequestCsrfToken();
        this.evidenceService.GetEvidenceByAssessmentClassIdAndDataDescription(0, '','');
        /*setTimeout(function(){
            getClass.unsubscribe();
        }, 15000)*/
        
    }

    ngOnInit(){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.user = this.session.User;
        this.getClass
        .subscribe(
           data => {this.myClass = data; this.classId = this.myClass[0].id},
           error => console.log(error),
           () => console.log(this.myClass)
        )
        this.finalEvidenceFileName = this.evidenceFileName;
    }

   ngDoCheck(){
       this.finalEvidenceFileName = this.evidenceFileName;
   }

    fileUrl(){
        if(!this.finalEvidenceFileName){
            return this.sanitizer.bypassSecurityTrustResourceUrl('/images/uploads/'+this.evidenceFileName);
        }else{
            return this.sanitizer.bypassSecurityTrustResourceUrl('/images/uploads/'+this.finalEvidenceFileName);
        }
    }



    onUploadFile(){
        console.log(this.evidenceCode);
        this.getCsrf.subscribe(
            data =>{
                let uploadFile = (<HTMLInputElement>window.document.getElementById('my-file-selector')).files[0];

                let evidenceUploadItem:any = new EvidenceUploadItem(uploadFile);
                //evidenceUploadItem.name = 'file';
                evidenceUploadItem.formData = { 
                    FormDataKey:'file', 
                    classId:this.classId, 
                    assessmentClass:this.evidenceCode.assessmentClass,
                    assessment:this.evidenceCode.assessment,
                    programSopi:this.evidenceCode.programSopi,
                    programCourse:this.evidenceCode.programCourse,
                    dataDescription:this.evidenceCode.dataDescription,
                    _csrf:data._csrf
                };

                this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                    console.log(response)
                }

                this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                    console.log(response)
                }

                this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
                    console.log(response);
                    this.ngOnInit();
                }

                this.uploaderService.upload(evidenceUploadItem);
            }
        )
        
    }

    onClick(classId:number,assessmentClassId:number, assessmentId:number,programSopiId:number, programCourseId:number, dataDescription:string){
        this.evidenceCode = {
            classId:classId,
            assessmentClass:assessmentClassId,
            assessment:assessmentId, 
            programSopi:programSopiId, 
            programCourse:programCourseId, 
            dataDescription:dataDescription
        };
    }

    onFilePreview(assessmentClassId:number, dataDescription:string):void{
        let subscriber = this.getCsrf
                        .subscribe(
                            data =>{
                                this.evidenceService.GetEvidenceByAssessmentClassIdAndDataDescription(assessmentClassId, dataDescription, data._csrf)
                                    .subscribe(data => {
                                        console.log(data.fileName);  this.evidenceFileName = data.fileName;
                                    })
                            }
                        )
       
        setTimeout(function() {
            subscriber.unsubscribe();
        }, 5000);                    
    }

}
