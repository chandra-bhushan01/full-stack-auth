import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/auth'


  getAllUsers(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);
  }

  userLogin(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.baseUrl +"/login", body,{withCredentials:true});
  }

  userSignup(fullName:string,email:string, password:string,){
    const body = { fullName,email, password };
    return this.http.post(this.baseUrl +"/addUser", body,{withCredentials:true});
  }


}
