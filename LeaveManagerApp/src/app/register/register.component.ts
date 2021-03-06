import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Manager } from 'src/app/_models/Manager';
import { UserService } from '../_services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';
import { User } from '../_models/User';

// import { AlertifyService } from '../_service/alertify.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  confirmPasswordCtrl = new FormControl('', [Validators.required]);
  managers: Manager[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      isManager: [null, null],
      managerId: [null, null]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.loadManagerList();
  }

  // tslint:disable-next-line: typedef
  loadManagerList(){
    this.userService.getManagers().subscribe((managers: Manager[]) => {
      this.managers = managers;
    }, error => {
      console.log('Could not get managers');
    });
  }
  // tslint:disable-next-line: typedef
  register() {
    if (!this.registerForm.valid) {
      return;
    }
    if (this.registerForm.controls.isManager.value) {
      this.registerForm.controls.managerId.setValue(0);
    }
    this.authService.register(this.registerForm.value).subscribe((response) => {
      this.snackBar.open('Registration successful', '',
        {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
      this.snackBar.open(error.error, '',
        {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    });
  }
}
