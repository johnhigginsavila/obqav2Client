import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ClassService } from '../../../shared/services/class.service';
import { PagerService } from '../../../shared/services/pager.service';
import { IClass } from '../../../interfaces/class.interface';
import { ISession } from '../../../interfaces/session.interface';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css']
})
export class ManageClassesComponent implements OnInit {

  private classes:IClass[];
    private session:ISession;
    private program:number;

    //pager Service
    private allItems:any[];
    pager:any = {};
    pagedItems:IClass[];
    page:number;
    cycle:any[];
    term:any[];
    selectedCycle:number;
    selectedTerm:number;

    constructor(private classService:ClassService, private pagerService:PagerService ){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.page = 1;
        this.term = [
            {name:'Term 2', value:2},
            {name:'Term 3', value:3},
            {name:'Term 1', value:1},
            {name:'All', value:0}
        ]

        this.cycle = [
            {name:'cycle 1',academicYear:'2014-2015', value: 1},
            {name:'cycle 2',academicYear:'2015-2016',  value: 2},
            {name:'cycle 3',academicYear:'2016-2017',  value: 3},
            {name:'cycle 4',academicYear:'2017-2018',  value: 4},
            {name:'cycle 5',academicYear:'2018-2019',  value: 5}
        ];
        this.selectedCycle = 1;
        this.selectedTerm = 2;
    }
    ngOnInit(){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        let classData = this.classService.GetClassesPerProgramPerCyclePerTerm(this.program, this.selectedCycle, this.selectedTerm)
            .subscribe(
                data => {
                    this.classes = data;
                    this.setPage(this.page);
                },
                err => console.log(err),
                ()=>console.log(this.classes)
            );
        
        setTimeout(function() {
            classData.unsubscribe();
        }, 10000);    
    }
    change(){
        this.page = 1;
        this.setPage(this.page);
        this.ngOnInit();   
    }
    isClass(classId:number):boolean{
        if(classId == 0){
            return false;
        }else{
            return true;
        }
    }
    setPage(page:number){
        if(page < 1 || page > this.pager.totalPages){
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.classes.length, page);
        console.log(this.pager);
        //get current page of items
        this.pagedItems = this.classes.slice(this.pager.startIndex , this.pager.endIndex + 1);
        this.page = page;
        console.log(this.pagedItems);
    }

}
