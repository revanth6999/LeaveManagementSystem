import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave } from 'src/app/_models/Leave';
import { TotalLeave } from '../_models/TotalLeave';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  LeaveMangerAPIURL = environment.LeaveMangerAPIURL;

  constructor(private http: HttpClient) { }

  getPendingRequests(mID): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.LeaveMangerAPIURL + 'pendingRequests/' + mID, httpOptions);
  }

  getLeaveRequests(Id): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.LeaveMangerAPIURL + 'leaves/' + Id, httpOptions);
  }
  // tslint:disable-next-line: typedef
  updateLeaveStatus(model: any) {
    return this.http.put(this.LeaveMangerAPIURL + 'updatestatus', model, httpOptions);
  }
  // tslint:disable-next-line: typedef
  applyLeave(model: any) {
    return this.http.post(this.LeaveMangerAPIURL + 'request', model, httpOptions);
  }

  // tslint:disable-next-line: typedef
  addPolicy(model: any) {
    return this.http.post(this.LeaveMangerAPIURL + 'addLeavePolicy', model, httpOptions);
  }

  getTotalLeave(): Observable<TotalLeave> {
    return this.http.get<TotalLeave>(this.LeaveMangerAPIURL + 'totalLeaves/', httpOptions);
  }

}
