import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LeaveService } from '../_services/leave.service';
import { AuthService } from '../_services/auth.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-entitlement',
  templateUrl: './leave-entitlement.component.html',
  styleUrls: ['./leave-entitlement.component.css']
})
export class LeaveEntitlementComponent implements OnInit {

  entitlementForm: FormGroup;
  user: User;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private leaveService: LeaveService
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.entitlementForm = this.formBuilder.group({
      totalCasualLeaves: [null, Validators.required],
      totalEarnedLeaves: [null, Validators.required]
    });
    this.user = this.authService.currentUser;
    if (!this.user.isManager) {
      this.router.navigate(['/dashboard']);
    }
  }

  addPolicy(): void{
    if (!this.entitlementForm.valid) {
      return;
    }
    this.leaveService.addPolicy(this.entitlementForm.value).subscribe(() => {
      this.snackBar.open('Updated successfully', '',
        {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, error => {
      this.snackBar.open(error.error, '',
        {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    });
  }
}
