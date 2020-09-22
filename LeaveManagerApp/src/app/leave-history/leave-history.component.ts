import { Component, OnInit } from '@angular/core';
import { Leave } from '../_models/Leave';
import { LeaveService } from '../_services/leave.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css']
})
export class LeaveHistoryComponent implements OnInit {

  user: User;
  leaves: Leave[];
  totalRequests: number;

  constructor(private leaveService: LeaveService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    if (this.user.isManager) {
      this.router.navigate(['/dashboard']);
    }
    this.loadLeaveRequests();
  }

  // tslint:disable-next-line: typedef
  loadLeaveRequests(){
    this.leaveService.getLeaveRequests(this.user.id).subscribe((leaves: Leave[]) => {
      this.leaves = leaves;
      this.totalRequests = leaves.length;
    }, error => {
      console.log('load leaves error');
    });

  }
}
