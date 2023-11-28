import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthAppModule} from './auth-app/auth-app.module';
import {CoreModule} from './core/core.module';
import {AuthenticationService} from './core/services/authentication.service';
import {SnackBarService} from './core/components/snackbar/snack-bar.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		AuthAppModule,
		CoreModule
	],
	providers: [
		AuthenticationService,
		SnackBarService
    ],
	bootstrap: [AppComponent]
})
export class AppModule {
}
