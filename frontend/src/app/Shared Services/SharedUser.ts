import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SharedUser {
 
   userData = new BehaviorSubject<any[]>([]);
  
 
}
