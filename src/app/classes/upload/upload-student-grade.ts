import { UploadItem } from '../../shared/upload-item';

export class StudentGradeUploadItem extends UploadItem {
    constructor(file:any){
        super();
        this.url = '/grade/upload';
        this.file = file;
    }
}