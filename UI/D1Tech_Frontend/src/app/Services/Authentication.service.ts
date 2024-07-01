import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { lastValueFrom } from 'rxjs';

const apiUrl = "https://localhost:7056/api/Login/";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(user: User): Promise<any> {
    let url = `${apiUrl}Login`;
    let data = this.http.post<any>(url, user);
    return lastValueFrom(data);
  }

  register(user: User): Promise<any> {
    let url = `${apiUrl}Register`;
    let data = this.http.post<any>(url, user);
    return lastValueFrom(data);
  }

}
