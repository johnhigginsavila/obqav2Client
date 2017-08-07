import { IUser } from './user.interface';
import { ICookie } from './cookie.interface';
import { Observable } from 'rxjs/Observable';
export class ISession extends Observable<ISession>{
    authenticated:boolean;
    token:string;
    User: IUser;
    Cookie:ICookie;

   
}