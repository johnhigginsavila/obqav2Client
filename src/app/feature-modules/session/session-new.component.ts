import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from '../../shared/services/session.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ISession } from '../../interfaces/session.interface';

import {AppComponent} from '../../app.component';

interface IChanges{[key:string]:SimpleChange};

@Component({
  selector: 'app-session-new',
  templateUrl: './session-new.component.html',
  styleUrls: ['./session-new.component.css']
})
export class SessionNewComponent implements OnInit {

  session:ISession;
    sessionNewForm:FormGroup;
    private getCsrf:Observable<any>;

    constructor(private formBuilder:FormBuilder, private sessionService:SessionService, private _router:Router, private authenticationService:AuthenticationService){
        this.getCsrf = this.authenticationService.RequestCsrfToken();
        this.sessionNewForm = this.formBuilder.group({
            email: new FormControl('',Validators.required),
            password: new FormControl('',Validators.required),
            _csrf: new FormControl('')
        });
    }

    ngOnInit(){
        this.getCsrf.subscribe(
            data => {
                console.log(data);
                this.sessionNewForm = this.formBuilder.group({
                    email: new FormControl('',Validators.required),
                    password: new FormControl('',Validators.required),
                    _csrf: new FormControl(data._csrf)
                });
            },
        error => console.log(error)
        );
    }

/*    onSubmit(){
        
       this.sessionService.SessionCreate2(this.sessionNewForm.value)
            .subscribe(
                data => localStorage.setItem('session', JSON.stringify(data.json())),
                error => console.log(error.json()),
                () => this._router.navigate(['home'])
            )
            
        
       
        //alert(JSON.stringify(this.sessionNewForm.value));
    }*/

    onSubmit(){
        console.log(this.sessionNewForm.value);
        let submit = this.sessionService.SessionCreate2(this.sessionNewForm.value)
                        .subscribe(
                            data => localStorage.setItem('session',JSON.stringify(data)),
                            error => this._router.navigate(['session/new']),
                            () => this._router.navigate(['class'])
                        )
         setTimeout(function(){
            submit.unsubscribe()
         }, 500)
    }

    ngOnChanges(changes:IChanges){
          
            
    }

}
