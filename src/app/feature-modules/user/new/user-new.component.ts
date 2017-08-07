import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { IUserNew } from '../../../interfaces/user-new.interface';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { UserService } from '../../../shared/services/user.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  userNewForm:FormGroup;
    constructor(private formBuilder:FormBuilder, private userService:UserService, private authenticationService:AuthenticationService, private router:Router){
        
        this.userNewForm = this.formBuilder.group({
            firstname: new FormControl('',Validators.required),
            lastname: new FormControl('',Validators.required),
            email: new FormControl('',Validators.required),
            program: new FormControl('n/a'),
            userRestriction: new FormControl('faculty'),
            password: new FormControl('',Validators.required),
            confirmation: new FormControl('',Validators.required),
            _csrf: new FormControl('', Validators.required)
        });
               

    }

    ngOnInit(){
        this.authenticationService.RequestCsrfToken()
            .subscribe(
                data => {
                    this.userNewForm = this.formBuilder.group({
                        firstname: new FormControl('',Validators.required),
                        lastname: new FormControl('',Validators.required),
                        email: new FormControl('',Validators.required),
                        program: new FormControl('n/a'),
                        userRestriction: new FormControl('faculty'),
                        password: new FormControl('',Validators.required),
                        confirmation: new FormControl('',Validators.required),
                        _csrf: new FormControl(data._csrf, Validators.required)
                    });
                },
                error => console.log(error)
            )
    }

    onSubmit(){
        this.userService.addUser(this.userNewForm.value)
            .subscribe(
                response => {
                    console.log(response);
                    localStorage.setItem('session', JSON.stringify(response));
                },
                error => {
                    console.log(error);
                    this.ngOnInit();
                },
                () => {
                    this.ngOnInit();
                    this.router.navigateByUrl("/class")
                }
            )
    }

}
