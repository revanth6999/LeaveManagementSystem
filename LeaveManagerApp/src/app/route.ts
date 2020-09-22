import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { LeaveEntitlementComponent } from './leave-entitlement/leave-entitlement.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { RequestListComponent } from './request-list/request-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/AuthGuard';

export const appRoutes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'entitlement', component: LeaveEntitlementComponent, canActivate: [AuthGuard] },
    { path: 'history', component: LeaveHistoryComponent, canActivate: [AuthGuard] },
    { path: 'requests', component: RequestListComponent, canActivate: [AuthGuard] },
    { path: 'leave/new', component: LeaveRequestComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
