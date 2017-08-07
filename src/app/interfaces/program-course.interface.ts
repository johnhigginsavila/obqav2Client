import {ICourse} from './programcourse-partial-interfaces/course.interface';

export class IProgramCourse {
    description:string;
    id:number;
    program:number;
    toBeAssessed:boolean;
    units:number;
    course:ICourse;

}