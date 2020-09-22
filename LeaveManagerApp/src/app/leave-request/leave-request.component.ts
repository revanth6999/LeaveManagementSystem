import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, MaxLengthValidator, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { LeaveService } from '../_services/leave.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';
import { Router } from '@angular/router';
import { Leave } from '../_models/Leave';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.minDate = new Date();
  }

  leave: any = {};
  minDate: Date;
  user: User;
  requestForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  weekendFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      type: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      reason: [null, Validators.required]
    });
    this.user = this.authService.currentUser;
    if (this.user.isManager) {
      this.router.navigate(['/dashboard']);
    }
  }

  // tslint:disable-next-line: typedef
  apply(){
    if (!this.requestForm.valid) {
      this.snackBar.open('Please fill all the required details', '',
      {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    this.leave.type = this.requestForm.controls.type.value;
    this.leave.fromDate = this.requestForm.controls.fromDate.value.toLocaleDateString();
    this.leave.toDate = this.requestForm.controls.toDate.value.toLocaleDateString();
    this.leave.reason = this.requestForm.controls.reason.value;
    this.leave.eId = this.user.id;
    this.leave.managerId = this.user.managerId;

    console.log(this.leave);

    this.leaveService.applyLeave(this.leave).subscribe(() => {
      this.snackBar.open('Leave request sent', '',
        {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, error => {
      this.snackBar.open(error.error, '',
        {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    });
  }
}


// reasonControl = new FormControl('', [Validators.required]);
//   fromDateControl = new FormControl('', [Validators.required]);
//   toDateControl = new FormControl('', [Validators.required]);
//   typeFormControl = new FormControl('', [Validators.required]);