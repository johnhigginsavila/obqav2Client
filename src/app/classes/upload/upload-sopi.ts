import { UploadItem } from '../../shared/upload-item';

export class SopiUploadItem extends UploadItem {
    constructor(file:any){
        super();
        this.url = '/sopi/upload';
        this.file = file;
    }
}