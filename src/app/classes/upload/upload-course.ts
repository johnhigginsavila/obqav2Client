import { UploadItem } from '../../shared/upload-item';

export class CourseUploadItem extends UploadItem {
    constructor(file:any){
        super();
        this.url = '/course/upload';
        this.file = file;
    }
}