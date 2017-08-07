import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CourseService } from '../../../shared/services/course.service';
import { PagerService } from '../../../shared/services/pager.service';

import { IProgramCourse } from '../../../interfaces/program-course.interface';
import { ISession } from '../../../interfaces/session.interface'; 

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {

  private programCourses: IProgramCourse[];
    private session:ISession;
    private program:number;
    private getCourses:Observable<IProgramCourse[]>;

    //pager Service
    private allItems:any[];
    pager:any = {};
    pagedItems:IProgramCourse[];
    page:number;


    constructor(private courseService: CourseService, private pagerService:PagerService) {
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.getCourses = this.courseService.GetCoursesPerProgram(this.program);
        this.programCourses = [];
    }
    ngOnInit() {
        let courseData = this.getCourses
            .subscribe(
                data => {
                    this.programCourses = data;
                    this.setPage(this.page);
                },
                error => console.log(error),
                () => console.log(this.programCourses)
            )

    }
    setPage(page:number){
    if(page < 1 || page > this.pager.totalPages){
        return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.programCourses.length, page);
    console.log(this.pager);
    //get current page of items
    this.pagedItems = this.programCourses.slice(this.pager.startIndex , this.pager.endIndex + 1);
    this.page = page;
    console.log(this.pagedItems);
    }

}
