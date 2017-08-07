import { UploadItem } from '../../shared/upload-item';

export class AssessmentUploadItem extends UploadItem {
    constructor(file:any){
        super();
        this.url = '/assessment/upload';
        this.file = file;
    }
}