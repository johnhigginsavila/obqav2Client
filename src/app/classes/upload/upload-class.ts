import { UploadItem } from '../../shared/upload-item';

export class ClassUploadItem extends UploadItem {
    constructor(file:any){
        super();
        this.url = '/class/upload';
        this.file = file;
    }
}