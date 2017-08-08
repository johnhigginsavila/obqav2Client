import { UploadItem } from '../../shared/upload-item';
import {BaseUrl} from '../../shared/api-url/api-url';
export class EvidenceUploadItem extends UploadItem {
    constructor(file:any){
        super();
        this.url = BaseUrl.globalBaseUrl + 'evidence/upload';
        this.file = file;
    }
}