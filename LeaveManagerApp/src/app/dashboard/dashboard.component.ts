import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';
import { TotalLeave } from '../_models/TotalLeave';
import { LeaveService } from '../_services/leave.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    user: User;
    totalLeave: TotalLeave;
    availableCasualLeaves: number;
    availableEarnedLeaves: number;

    constructor(private authService: AuthService, private leaveService: LeaveService, private userService: UserService) { }

    ngOnInit(): void {
      this.user = this.authService.currentUser;
      // this.user = this.getUser();
      this.getUser();
      this.getTotalLeave();
    }

    getUser(): void {
      this.userService.getUser(this.authService.currentUser.id).subscribe((user: User) => {
        this.user = user;
      }, error => {
        console.log('get user error');
      });
    }

    getTotalLeave(): void{
      this.leaveService.getTotalLeave().subscribe((totalLeave: TotalLeave) => {
        this.totalLeave = totalLeave;
        this.availableCasualLeaves = 0;
        this.availableEarnedLeaves = 0;
        if (this.totalLeave.totalCasualLeaves - this.user.usedCasualLeaves > 0) {
          this.availableCasualLeaves = this.totalLeave.totalCasualLeaves - this.user.usedCasualLeaves;
        }
        if (this.totalLeave.totalEarnedLeaves - this.user.usedEarnedLeaves > 0) {
          this.availableEarnedLeaves = this.totalLeave.totalEarnedLeaves - this.user.usedEarnedLeaves;
        }
      }, error => {
        console.log('load total leaves error');
      });
    }
}

