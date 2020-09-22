import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { LeaveService } from '../_services/leave.service';
import { UserService } from '../_services/user.service';
import { Leave } from 'src/app/_models/Leave';
import { User } from 'src/app/_models/User';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  user: User;
  leaves: Leave[];
  users = new Array();
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  totalRequests: number;
  keys: any;

  constructor(
    private leaveService: LeaveService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    if (!this.user.isManager) {
      this.router.navigate(['/dashboard']);
    }
    this.loadPendingRequests();
  }

  loadPendingRequests(): void{
    this.leaveService.getPendingRequests(this.user.id).subscribe((leaves: Leave[]) => {
      this.leaves = leaves;
      const range = n => Array.from({length: n}, (value, key) => key);
      this.totalRequests = leaves.length;
      this.keys = range(this.totalRequests);
      console.log(this.keys);
      for (const leave of leaves)
      {
        this.userService.getUser(leave.eId).subscribe((user: User) => {
          this.users.push(user);
        }, error => {
          console.log('load user ' + leave.eId + ' error');
        });
      }
      console.log(this.users);
    }, error => {
      console.log('load leaves error');
    });
  }

  approve(leave: Leave): void{
    const index = this.leaves.indexOf(leave);
    this.leaves.splice(index, 1);
    this.users.splice(index, 1);
    leave.status = 'Approved';
    this.leaveService.updateLeaveStatus(leave).subscribe(() => {
      this.snackBar.open('Leave approved', '',
      {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }, error => {
      console.log(error);
    });
    this.decrementTotalRequests();
  }

  reject(leave: Leave): void{
    const index = this.leaves.indexOf(leave);
    this.leaves.splice(index, 1);
    this.users.splice(index, 1);
    leave.status = 'Rejected';
    this.leaveService.updateLeaveStatus(leave).subscribe(() => {
      this.snackBar.open('Leave rejected', '',
      {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }, error => {
      console.log(error);
    });
    this.decrementTotalRequests();
  }

  decrementTotalRequests(): void {
    this.totalRequests--;
    const range = n => Array.from({length: n}, (value, key) => key);
    this.keys = range(this.totalRequests);
  }
}
