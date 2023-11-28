import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

import {BehaviorSubject, Observable} from 'rxjs';

import {BaseVariable} from '../../../environments/environment';
import {GenericResponseModal} from '../models/generic-response.modal';
import {ApiConstants} from '../constant/api.constants';
import {GetOtpModal} from '../models/get-otp.modal';
import {RegistrationModal} from '../models/registration.modal';
import {LoginModal} from '../models/login.modal';
import {Validation} from '../utils/validation';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public readonly urlsConstants = ApiConstants.LOGIN_URLS;
  public currentUser: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public jwtHelperServe = new JwtHelperService()

  constructor(private httpClient: HttpClient) {
  }

  public registration(modal: RegistrationModal): Observable<GenericResponseModal> {
    return this.httpClient.post<GenericResponseModal>(BaseVariable.BASE_URL +
      this.urlsConstants.REGISTRATION, modal);
  }

  public getOTP(modal: GetOtpModal): Observable<GenericResponseModal> {
    return this.httpClient.post<GenericResponseModal>(BaseVariable.BASE_URL +
      this.urlsConstants.GET_OTP, modal);
  }

  public login(modal: LoginModal): Observable<GenericResponseModal> {
    return this.httpClient.post<GenericResponseModal>(BaseVariable.BASE_URL +
      this.urlsConstants.LOGIN, modal);
  }

  public setToken(token: string): void {
    localStorage.setItem('access_token', Validation.validateInput(token));
    this.loadCurrentUser();
  }

  public getToken(): string {
    return Validation.validateInput(localStorage.getItem('access_token'))
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  public logout(): void {
    localStorage.setItem('access_token', '');
  }

  private loadCurrentUser(): void {
    const token = localStorage.getItem('access_token');
    const userInfo = token != null ? this.jwtHelperServe.decodeToken(token) : null;
    const data = {
      id: userInfo.id,
      username: userInfo.username
    }
    this.currentUser.next(data);
  }
}
