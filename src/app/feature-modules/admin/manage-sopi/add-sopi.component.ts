import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Uploader } from '../../../shared/services/uploader.service';
import { SopiUploadItem } from '../../../classes/upload/upload-sopi';

import { SopiService } from '../../../shared/services/sopi.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ISopiNew } from '../../../interfaces/sopi-new.interface';
import { ISession } from '../../../interfaces/session.interface';

@Component({
  selector: 'app-add-sopi',
  templateUrl: './add-sopi.component.html',
  styleUrls: ['./add-sopi.component.css']
})
export class AddSopiComponent implements OnInit {

  sopiNewForm:FormGroup;
    sopiNew:ISopiNew; 
    private session:ISession;
    private program:number;
    private getCsrf:Observable<any>;

    constructor(private authenticationService:AuthenticationService ,private formBuilder: FormBuilder, private sopiService:SopiService, private uploaderService:Uploader){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.getCsrf = this.authenticationService.RequestCsrfToken();
        this.sopiNewForm = this.formBuilder.group({
            soCode: new FormControl('', Validators.required),
            sopiCode : new FormControl('',Validators.required),
            description : new FormControl('',Validators.required),
            program : new FormControl(this.program),
            _csrf: new FormControl('', Validators.required)
        })
    }

    ngOnInit(){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        let subscriber = this.getCsrf.subscribe(
            data => {
                this.sopiNewForm = this.formBuilder.group({
                    soCode: new FormControl('',Validators.required),
                    sopiCode : new FormControl('',Validators.required),
                    description : new FormControl('',Validators.required),
                    program : new FormControl(this.program),
                    _csrf: new FormControl(data._csrf, Validators.required)
                })
            },
            err => console.log(err)
        )
        
    }

    onSubmit(){
        this.sopiNew = this.sopiNewForm.value;
        let addSopi = this.sopiService.AddSopi(this.sopiNew)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            )

        setTimeout(function(){
            addSopi.unsubscribe();
        }, 15000)
    }

    onUploadFile(){
        let subscriber = this.getCsrf.subscribe(
            data => {
                let uploadFile = (<HTMLInputElement>window.document.getElementById('file')).files[0];

                let sopiUploadItem:any = new SopiUploadItem(uploadFile);
                sopiUploadItem.name = 'file';
                sopiUploadItem.formData = { FormDataKey:'file', program:this.program, _csrf:data._csrf};

                this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                    console.log(response)
                }

                this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                    console.log('error')
                }

                this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
                    this.ngOnInit();
                }

                this.uploaderService.upload(sopiUploadItem);
            },
            err => console.log(err)
        )
        setTimeout(function() {
            subscriber.unsubscribe();
        }, 15000);
    }

}
