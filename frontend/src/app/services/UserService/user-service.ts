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


  getUserData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getData`)
  }

  setUserData(data: {
    address: string,
    date_of_birth: Date,
    email: string,
    full_name: string,
    phone_number: string,
    profile_picture: string
  }) {
    return this.http.post(`${this.baseUrl}/setData`, data)
  }

}
