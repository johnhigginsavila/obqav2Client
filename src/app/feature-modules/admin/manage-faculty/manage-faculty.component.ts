import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../shared/services/user.service';
import { PagerService } from '../../../shared/services/pager.service';

import { IUser } from '../../../interfaces/user.interface';
import { ISession } from '../../../interfaces/session.interface';

@Component({
  selector: 'app-manage-faculty',
  templateUrl: './manage-faculty.component.html',
  styleUrls: ['./manage-faculty.component.css']
})
export class ManageFacultyComponent implements OnInit {

  private users:IUser[];
    private getUsersByProgram:Observable<IUser[]>;
    private session:ISession;
    private program:number;

    //pager Service
    private allItems:any[];
    pager:any = {};
    pagedItems:IUser[];
    page:number;

    constructor(private userService:UserService, private pagerService:PagerService){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.getUsersByProgram = userService.GetUsersPerProgram(this.program);
        this.users = [];
    }

    ngOnInit(){
        let getUser = this.getUsersByProgram
            .subscribe(
                data => {
                    this.users = data
                    this.setPage(this.page);
                },
                error => console.log(error),
                () => console.log(this.users)
            )
        setTimeout(function(){
            getUser.unsubscribe();
        }, 15000)    
    }
    setPage(page:number){
    if(page < 1 || page > this.pager.totalPages){
        return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.users.length, page);
    console.log(this.pager);
    //get current page of items
    this.pagedItems = this.users.slice(this.pager.startIndex , this.pager.endIndex + 1);
    this.page = page;
    console.log(this.pagedItems);
    }

}
