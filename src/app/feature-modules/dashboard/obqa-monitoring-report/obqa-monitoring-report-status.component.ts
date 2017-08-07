import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { AssessmentService } from '../../../shared/services/assessment.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { IAssessmentStatus } from '../../../interfaces/assessment-status.interface';

@Component({
  selector: 'app-obqa-monitoring-report-status',
  templateUrl: './obqa-monitoring-report-status.component.html',
  styleUrls: ['./obqa-monitoring-report-status.component.css']
})
export class ObqaMonitoringReportStatusComponent implements OnInit {

  private _csrf:string;
    private barChartData:any[];
    private barChartLabels:any[];
    private barChartOptions:any;
    private barChartColors:any[];
    private barChartLegend:boolean;
    private barChartType:string;

    private programStatus:any[];
    constructor(private assessmentService:AssessmentService, private authenticationService:AuthenticationService){
            
    }


    

    //Total Progress
    ngOnInit(){
        this._csrf = this.authenticationService.GetCsrfToken();
        console.log(this._csrf);
        let cycle:number = 2;
        this.authenticationService.RequestCsrfToken()
            .subscribe(
              data => {
                this.assessmentService.GetAssessmentStatusSummary(cycle,data._csrf)
                .subscribe(
                    data => {
                        this.barChartData = [{data:[data.term1*100, data.term2*100, data.term3*100], label:'OBQA Monitoring Report Submission'}]
                    },
                    error => console.log(error)
                );
                this.assessmentService.GetAssessmentStatusPerProgram(cycle, data._csrf)
                  .subscribe(
                      data => {this.programStatus = data;},
                      error => console.log(error)
                  )

              },
              error => console.log(error)
            )

                

        this.barChartData = [
          {data: [65, 59, 80], label:'Progress' }
           ];
        this.barChartLabels = ['Term 1', 'Term 2', 'Term 3'];
      
        this.barChartOptions = {
          responsive: true,
          scales:{
            xAxes:[{
                ticks:{
                  max:100,
                  min:1
                },
            yAxes: [{
               categorySpacing: 90
            }]
              
            }]
          }
        };

        this.barChartColors = [
          { // bar
            backgroundColor: 'rgba(76,182,182,100)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          }
        ];
        this.barChartLegend = true;
        this.barChartType = 'horizontalBar';    
    }

     // barChart
  
 
  randomize():void {
    let _barChartData:Array<any> = new Array(this.barChartData.length);
    for (let i = 0; i < this.barChartData.length; i++) {
      _barChartData[i] = {data: new Array(this.barChartData[i].data.length), label: this.barChartData[i].label};
      for (let j = 0; j < this.barChartData[i].data.length; j++) {
        _barChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.barChartData = _barChartData;

    console.log(this.barChartData)
    
  }
     //End Progress

  chartClicked(e:any):void {
    console.log(e);
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }

}
