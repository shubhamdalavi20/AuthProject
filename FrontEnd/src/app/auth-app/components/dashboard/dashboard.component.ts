import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthAppConstants} from '../../constants/auth-app-constants';
import {StringsConstants} from '../../../core/constant/strings.constants';
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: 'auth-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public readonly welcomeString = AuthAppConstants.WELCOME_MESSAGE;
  public readonly logout = StringsConstants.LOGOUT;
  constructor(private route: Router, private authService : AuthenticationService) {
  }

  public onLogOut(): void {
    this.authService.logout();
    this.route.navigateByUrl('login').then();
  }
}
