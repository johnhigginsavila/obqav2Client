import { IUser } from '../user.interface';
import { IClassStudent } from './class-student.interface';
export class IClass {
    id: number;
    programCourse: number;
    user:IUser;
    term:number;
    academicYear: string;
    room:string;
    description:string;
    classStudent:IClassStudent[];


}