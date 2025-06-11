import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/user'


  getUserData(): Observable<any>{
    return this.http.get(`${this.baseUrl}/getData`)
  }
  

}
