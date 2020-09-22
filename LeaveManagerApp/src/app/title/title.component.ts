import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { LeaveService } from '../_services/leave.service';
import { User } from '../_models/User';
import { Leave } from '../_models/Leave';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Output() toggleOpened = new EventEmitter();

  opened = false;
  // user: User;
  notifications: number;

  constructor(private router: Router, private authService: AuthService, private leaveService: LeaveService) { }

  ngOnInit(): void {
    // this.loggedIn = this.authService.loggedIn();
    // this.user = this.authService.currentUser;
    this.leaveService.getPendingRequests(this.authService.currentUser.id).subscribe((leaves: Leave[]) => {
      this.notifications = leaves.length;
    }, error => {
      console.log('load leaves error');
    });
  }

  toggle(): void{
    this.opened = !this.opened;
    this.toggleOpened.emit(this.opened);
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  loggedIn(): boolean{
    return this.authService.loggedIn();
  }
}
