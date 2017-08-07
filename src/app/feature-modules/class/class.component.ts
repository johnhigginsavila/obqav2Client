import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ClassService } from '../../shared/services/class.service';
import { IClass } from '../../interfaces/class.interface';
import { ISession } from '../../interfaces/session.interface';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  private classes:IClass[];
    private session:ISession;
    private program:number;
    private instructor:number;
    cycle:any[];
    term:any[];
    selectedCycle:number;
    selectedTerm:number;

    constructor(private classService:ClassService, private router:Router, private route:ActivatedRoute){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.instructor = this.session.User.id;
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
        this.instructor = this.session.User.id;
        this.classService.GetFacultyClasses(this.program,this.selectedCycle,this.selectedTerm,this.instructor)
            .subscribe(
                data => this.classes = data,
                err => console.log(err),
                () => console.log(this.classes)
            )
        /*setTimeout(function(){
            getFacultyClasses.unsubscribe()
        },30000) */   
    }

    change(){
        this.ngOnInit();   
    }

    onClassSelect(id:number, instructor:number){
        this.router.navigate(['class',instructor, id]);
    }

}
