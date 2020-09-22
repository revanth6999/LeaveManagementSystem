import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Manager } from '../_models/Manager';
import { User } from '../_models/User';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  LeaveMangerAPIURL = environment.LeaveMangerAPIURL;

  constructor(private http: HttpClient) { }

  getManagers(): Observable<Manager[]> {
      return this.http.get<Manager[]>(this.LeaveMangerAPIURL + 'managers', httpOptions);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.LeaveMangerAPIURL + 'users/' + id, httpOptions);
}
}
