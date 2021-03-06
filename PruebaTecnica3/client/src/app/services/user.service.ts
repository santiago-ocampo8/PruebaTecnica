import { EventEmitter, Injectable, Output, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { APP_HOST } from '../config/contants';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  @Output() reload: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }


  tokenId: string = '';


  login(username: string, password: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${APP_HOST}auth/login`, {
      username,
      password

    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  logout(): Observable<ResponseModel> {

    this.tokenId = this.getToken() || '';
    return this.http.post<ResponseModel>(`${APP_HOST}auth/logout`, {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tokenId}`
        })
      }
    );
  }

  me(): Observable<ResponseModel> {

    this.tokenId = this.getToken() || '';
    return this.http.get<ResponseModel>(`${APP_HOST}auth/me`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tokenId}`
        })
      }
    );
  }

  saveStorage(date="", token=""){
    localStorage.setItem(date,token);
  }
  getToken(){
    return localStorage.getItem("token")
  }



}
