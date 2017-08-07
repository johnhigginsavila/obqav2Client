import { IProgram } from './assessment-partial-interfaces/program.interface';
import { IAssessmentClass } from './assessment-partial-interfaces/assessment-class.interface';
import { IProgramSopi } from './assessment-partial-interfaces/program-sopi.interface';
import { IProgramCourse } from './assessment-partial-interfaces/program-course.interface';
export class IAssessment {
    id: number;
    program: IProgram;
    assessmentClass:IAssessmentClass[];
    programSopi:IProgramSopi;
    programCourse:IProgramCourse;
    assessmentLevel: number;
    assessmentTask: string;
    passingGrade: number;
    target:number;
    assessmentComment: string;
    improvementPlan: string;
    assessmentCycle: number;
    academicYear: string;
}