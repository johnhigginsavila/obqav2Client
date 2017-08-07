import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ClassService } from '../../../shared/services/class.service';
import { IClass } from '../../../interfaces/class.interface';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  private myClass:IClass[];
    private getClass:Observable<IClass[]>;
    private id:number;
    private instructor:number;
    constructor(private route:ActivatedRoute, private classService:ClassService,private router:Router){
        
        this.route.params.subscribe(params=> {this.id = params.id; this.instructor = params.instructor});
        console.log(this.id)
        this.getClass = this.classService.GetClassById(this.id,this.instructor)
                            
    }
    ngOnInit(){
        this.route.params.subscribe(params=> {this.id = params.id; this.instructor = params.instructor});
        this.getClass.subscribe(
                        data => this.myClass = data,
                        error => console.log(error)
                    )
        
    }

    onStudentGrades(classId:number){
        this.route.params.subscribe(
            params => this.router.navigate(['class/student-grade',params.instructor, params.id])
        )
         
    }
    onEvidences(classId:number){
        this.route.params.subscribe(
            params => this.router.navigate(['class/evidence',params.instructor, params.id])
        )
    }

}
