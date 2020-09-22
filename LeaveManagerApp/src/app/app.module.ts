import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { TitleComponent } from './title/title.component';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { LeaveService } from './_services/leave.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { RequestListComponent } from './request-list/request-list.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { LeaveEntitlementComponent } from './leave-entitlement/leave-entitlement.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './route';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    RegisterComponent,
    LoginComponent,
    LeaveRequestComponent,
    RequestListComponent,
    LeaveHistoryComponent,
    LeaveEntitlementComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    UserService,
    LeaveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
