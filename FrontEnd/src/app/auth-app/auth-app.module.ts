import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthAppComponent} from './auth-app.component';
import {LoginComponent} from '../core/components/login/login.component';
import {RegistrationComponent} from '../core/components/registration/registration.component';
import {PageNotFoundComponent} from '../core/components/page-not-found/page-not-found.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {CoreModule} from '../core/core.module';
import {SpinnerComponent} from '../core/components/spinner/spinner.component';

const appRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'registration',
		component: RegistrationComponent,
	},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
	{
		path: '**',
		component: PageNotFoundComponent,
	}
]

@NgModule({
	declarations: [
		AuthAppComponent,
		DashboardComponent,
		LoginComponent,
		RegistrationComponent,
    PageNotFoundComponent,
    SpinnerComponent
	],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    ReactiveFormsModule,
    CoreModule
  ],
	providers: []
})
export class AuthAppModule {
}
