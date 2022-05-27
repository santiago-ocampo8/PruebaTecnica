import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_HOST } from '../config/contants';
import { PersonModel } from '../models/person.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getPersons(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${APP_HOST}person`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        })
      }
    );
  }

  createPersons(person :PersonModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${APP_HOST}person/create`,person,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        })
      }
    );
  }

  editPersons(person :PersonModel, id:number): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(`${APP_HOST}person/edit/${id}`,person,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        })
      }
    );
  }
  getPerson(person :number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${APP_HOST}person/${person}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        })
      }
    );
  }
  deletePerson(person :number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(`${APP_HOST}person/delete/${person}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        })
      }
    );
  }
}
