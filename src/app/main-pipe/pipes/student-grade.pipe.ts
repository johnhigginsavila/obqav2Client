import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'studentGrade'
})

export class StudentGradePipe implements PipeTransform {
    transform(grade: any[], assessment:number):any{
        function getGrade(item:any,index:number,array:any[]){
            if(array[index].assessment == assessment){
                array[0]=array[index];
            }
        }
        grade.forEach(getGrade)
        return grade[0].grade;
        /*if(grade[0].assessment == assessment){
            return grade[0].grade; 
        }else{
            return 0;
        }*/
    }
}