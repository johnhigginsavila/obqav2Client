import { IUser } from './class-partial-interfaces/user.interface';
import { IProgramCourse } from './assessment-partial-interfaces/program-course.interface';
export class IClass{
    id:number;
    classStudent:any[];
    programCourse:IProgramCourse;
    assessmentClass:any[];
    user:IUser;
    term:number;
    cycle:number;
    academicYear:string;
    room:string;
    description:string;
}