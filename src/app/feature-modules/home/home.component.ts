import { RouterModule } from '@angular/router'; 

import { Component, OnChanges, SimpleChange, OnInit} from '@angular/core';

import { NgIf } from '@angular/common';


import { ISession } from '../../interfaces/session.interface';

import { SessionService } from '../../shared/services/session.service';
interface IChanges{[key:string]:SimpleChange};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private session:ISession;
    public pageTitle: string = 'GCOE-OBQA';

    constructor( private sessionService:SessionService){}

    ngOnInit(){
        this.session = JSON.parse(localStorage.getItem('session'))
           
    }

    ngDoCheck(){
        this.session = JSON.parse(localStorage.getItem('session'))
        this.isLogin();
    }

    isLogin():boolean{
        if(!this.session){
            return false;
        }
        else{
            return true;
        }
    }

}
