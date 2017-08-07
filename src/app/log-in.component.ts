import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';

import { NgIf, NgFor } from '@angular/common';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { SessionService } from './shared/services/session.service';

import { AuthenticationService } from './shared/services/authentication.service';

import { ISession } from './interfaces/session.interface';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  session:ISession;
    sessionNewForm:FormGroup;

    

    constructor(private formBuilder:FormBuilder, private sessionService:SessionService, private _router:Router, private authenticationService:AuthenticationService){
        
            this.sessionNewForm = this.formBuilder.group({
                email: new FormControl('',Validators.required),
                password: new FormControl('',Validators.required),
                _csrf: new FormControl('',Validators.required)
            });
            this.sessionService.SessionCreate2(this.sessionNewForm.value)
    }

    ngOnInit(){
        this.authenticationService.RequestCsrfToken()
            .subscribe(
                data => {
                    this.sessionNewForm = this.formBuilder.group({
                        email: new FormControl('',Validators.required),
                        password: new FormControl('',Validators.required),
                        _csrf: new FormControl(data._csrf,Validators.required)
                    });
                },
                error => console.log(error)
            )            
    }


    onSubmit(){
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

}
