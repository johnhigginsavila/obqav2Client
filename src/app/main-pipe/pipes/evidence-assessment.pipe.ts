import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'evidenceAssessment'
})

export class EvidenceAssessmentPipe implements PipeTransform {
    transform(evidence: any[], assessmentClass:number, dataDescription:string):string{

        
        function getEvidence(item:any,index:number,array:any[]){
            if(array[index].assessmentClass == assessmentClass && array[index].dataDescription == dataDescription){
                array[0] = array[index];
            }
        }
        
        if(evidence.length != 0){
            evidence.forEach(getEvidence)

            if(evidence[0].assessmentClass == assessmentClass && evidence[0].dataDescription == dataDescription){
                return evidence[0].fileName;
            }else{
                return "";
            }
        }else{
            return "";
        }

       // return evidence[0].fileName;
         
    }
}
