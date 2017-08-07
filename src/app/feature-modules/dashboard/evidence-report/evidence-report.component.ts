import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evidence-report',
  templateUrl: './evidence-report.component.html',
  styleUrls: ['./evidence-report.component.css']
})
export class EvidenceReportComponent implements OnInit {

      //Average evidence per cycle
    private barChartData:any[];
    private barChartLabels:any[];
    private barChartOptions:any;
    private barChartColors:any[];
    private barChartLegend:boolean;
    private barChartType:string;



    ngOnInit(){

        this.barChartData = [
          {data: [65, 59, 80], label:'Label' }
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
          { 
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

}
