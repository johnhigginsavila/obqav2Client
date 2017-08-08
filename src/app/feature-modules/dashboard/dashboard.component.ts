import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { AssessmentService } from '../../shared/services/assessment.service';
import { EvidenceService } from '../../shared/services/evidence.service';
import { IAssessmentStatus } from '../../interfaces/assessment-status.interface';
import { IEvidence } from '../../interfaces/evidence.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    //Total OBQA Progress
    private barChartData:any[];
    private barChartLabels:any[];
    private barChartOptions:any;
    private barChartColors:any[];
    private barChartLegend:boolean;
    private barChartType:string;

    private radarChartLabels:string[];
    private radarChartData:any;
    private radarChartType:string;
    private radarChartOptions:any;

    private images:string[];

    constructor(private assessmentService:AssessmentService, private evidenceService:EvidenceService){}

    //Evidence report bar chart
     private evidencebarChartType:string;
 

    //OBQA Monitoring Progress bar chart
    ngOnInit(){
       
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
                }
              
            }],
            yAxes: [{
               categorySpacing: 90
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
        this.evidencebarChartType = 'bar';  

        // Student Profile Radar Chart

        this.radarChartLabels = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'G1', 'G2', 'H1', 'H2', 'I1', 'I2',
        'J1', 'J2', 'K1', 'K2', 'K3', 'L1', 'L2'];
      
        this.radarChartData = [
          {data: [100, 90, 90, 81, 90, 90, 90, 90, 81, 90, 81, 81, 90, 90, 90,
                  90, 90, 90, 81, 90, 90, 90, 90, 81, 90, 81, 90, 90, 90], label: 'Cycle 1'},
          {data: [ 90, 90, 90, 81, 96,100, 90, 90, 81, 90, 90, 90, 90, 90, 90,
                  100,100, 90, 81, 96, 55, 90, 90,100, 90, 81, 96, 81, 90,], label: 'Cycle 2'},
          {data:  [90, 90, 90, 81, 96,100,100, 90, 81, 96,100,100, 81, 96, 100,
                  100,100,100, 90, 81, 96, 98, 90, 98, 98, 91 ,85, 80, 98], label: 'Cycle 3'}
        ];
        this.radarChartType = 'radar';
      
        this.radarChartOptions = {
                responsive: true,
                scales:{
                  xAxes:[{
                      ticks:{
                        max:100,
                        min:1
                      }            
                  }]   
                }
              }
                 
    }

     
  // Target and performace Report line chart
  public lineChartData:Array<any> = [
    {data: [80, 75, 80, 80, 90], label: 'Target'},
    {data: [86, 60, 87, 96, 99], label: 'Performance'}
  ];
  public lineChartLabels:Array<any> = ['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4', 'Cycle 5'];

  public lineChartColors:Array<any> = [

  { // dark grey performance
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
    { // Green Target
    backgroundColor: 'rgba(0, 128, 0, 0.40)',
    borderColor: 'rgba(0, 128, 0, 1)',
    pointBackgroundColor: 'rgba(0, 128, 0, 1',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0, 128, 0, 1'
  },
  ];
  public lineChartOptions:any = {
    elements: {
    line: {
        tension: 0
    }
    },
    responsive: true,
    scales:{
      yAxes:[{
          ticks:{
            max:100,
            min:1
          }
      }],
      xAxes:[{
          ticks:{
            max:100,
            min:1
          }
      }]
    }
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 // Target and performace Report line chart end
  chartClicked(e:any):void {
    console.log(e);
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }

}