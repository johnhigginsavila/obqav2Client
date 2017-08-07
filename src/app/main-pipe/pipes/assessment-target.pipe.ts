import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'assessmentTarget'
})

export class AssessmentTargetPipe implements PipeTransform {
    transform( target:number, passingGrade: number):string{
        let transformedValue:string = (target * 100) + '%' + ' of Students got a rating atleast ' + (passingGrade*100) + '%';
        return transformedValue;         
    }
}
