import { ICourse } from './course.interface';
export class IProgramCourse {

    id: number;
    units: number;
    toBeAssessed: boolean;
    description: string;
    program: number;
    course:ICourse;
    
}