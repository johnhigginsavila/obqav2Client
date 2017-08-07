import { UploadItem } from '../../shared/upload-item';

export class EvidenceUploadItem extends UploadItem {
    constructor(file:any){
        super();
        this.url = '/evidence/upload';
        this.file = file;
    }
}