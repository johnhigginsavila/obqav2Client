import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SopiService } from '../../../shared/services/sopi.service';
import { PagerService } from '../../../shared/services/pager.service';

import { IProgramSopi } from '../../../interfaces/program-sopi.interface';
import { ISession } from '../../../interfaces/session.interface';

@Component({
  selector: 'app-manage-sopi',
  templateUrl: './manage-sopi.component.html',
  styleUrls: ['./manage-sopi.component.css']
})
export class ManageSopiComponent implements OnInit {

  private programSopi: IProgramSopi[];
    private getProgramSopi:Observable<IProgramSopi[]>;
    private session: ISession;
    private program:number;

    //pager
    private allItems:any[];
    pager:any = {};
    pagedItems:IProgramSopi[];
    page:number;

    constructor(private sopiService: SopiService, private pagerService:PagerService){
        this.session = JSON.parse(localStorage.getItem('session'));
        this.program = this.session.User.program;
        this.getProgramSopi = this.sopiService.GetSopiByProgram(this.program);

    }
    ngOnInit(){
        var sopiData = this.getProgramSopi
        .subscribe(
            data => {
                this.programSopi = data
                this.setPage(this.page);
            },
            error => console.log(error),
            () => console.log(this.programSopi)
        )
    }
    setPage(page:number){
    if(page < 1 || page > this.pager.totalPages){
        return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.programSopi.length, page);
    console.log(this.pager);
    //get current page of items
    this.pagedItems = this.programSopi.slice(this.pager.startIndex , this.pager.endIndex + 1);
    this.page = page;
    console.log(this.pagedItems);
    }

}
