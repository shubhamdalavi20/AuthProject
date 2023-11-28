import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

import {SnackBarComponent} from './components/snackbar/snack-bar.component';
import {AuthAppInterceptor} from './interceptor/auth-app.interceptor';

@NgModule({
	declarations: [
		SnackBarComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSnackBarModule,
	],
  exports: [
    SnackBarComponent,
  ],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: AuthAppInterceptor, multi: true}
	]
})
export class CoreModule {
}
