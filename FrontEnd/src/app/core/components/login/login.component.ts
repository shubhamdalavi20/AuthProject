import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {StringsConstants} from '../../constant/strings.constants';
import {Validation} from '../../utils/validation';
import {AuthenticationService} from '../../services/authentication.service';
import {SnackBarService} from '../snackbar/snack-bar.service';
import {NumbersConstants} from "../../constant/numbers.constants";


@Component({
  selector: 'auth-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public readonly Validation = Validation;
  public readonly stringsConstants = StringsConstants;

  public submittedUserName: boolean = false;
  public submittedOTP: boolean = false;
  public otp: string = '';
  public loginForm!: FormGroup;

  public display: string = '';
  public timerInterval: any;
  public isLoading: boolean = false;

  private readonly numbersConstants = NumbersConstants;
  private getOTPSubscription: Subscription = new Subscription();
  private loginSubscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private snackBar: SnackBarService, private route: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      otp: ['',
        [
          Validators.required
        ]
      ],
    });
  }

  public onGetOTP(): void {
    this.submittedUserName = true;
    if (this.loginForm.invalid && this.loginForm.get('userName')?.errors) {
      if (this.loginForm.get('userName')?.hasError('required')) {
        this.snackBar.warning(this.stringsConstants.USER_NAME + this.stringsConstants.IS_REQUIRED);
      } else if (this.loginForm.get('userName')?.hasError('minlength')) {
        this.snackBar.warning(this.stringsConstants.USERNAME_MIN_LENGTH);
      } else if (this.loginForm.get('userName')?.hasError('maxlength')) {
        this.snackBar.warning(this.stringsConstants.USERNAME_MAX_LENGTH);
      }
      this.submittedUserName = false;
      return;
    }
    this.isLoading = true;
    this.authService.getOTP({userName: this.loginForm.value.userName}).subscribe(response => {
      //0 - bad req, 1 - success(token), 2 - username is not correct,
      this.isLoading = false;
      if (response != null && response.success && response.statusCode == this.numbersConstants.TWO_HUNDRED) {
        switch (response.result.response) {
          case this.numbersConstants.ONE :
            this.submittedUserName = true;
            this.loginForm.get('userName')?.disable();
            this.otp = Validation.validateInput(response.result.otp);
            this.timer(30);
            this.authService.setToken(Validation.validateInput(response.result.token))
            break;
          case this.numbersConstants.TWO :
            this.snackBar.warning(this.stringsConstants.USER_NAME_IS_NOT_CORRECT);
            this.submittedUserName = false;
            break;
          default:
            this.snackBar.error(this.stringsConstants.BAD_REQUEST);
            this.submittedUserName = false;
            break;
        }
      } else {
        this.snackBar.error(this.stringsConstants.INTERNAL_SERVER_ERROR);
        this.submittedUserName = false;
      }
    }, () => {
      this.isLoading = false;
      this.snackBar.warning(this.stringsConstants.BAD_REQUEST);
      this.submittedUserName = false;
    });
  }

  public onLogin(): void {
    this.submittedOTP = true;
    if (this.loginForm.invalid) {
      if (this.loginForm.get('otp')?.hasError('required')) {
        this.snackBar.warning(this.stringsConstants.OTP + this.stringsConstants.IS_REQUIRED);
        this.submittedOTP = false;
        return;
      }
    }
    this.isLoading = true;
    this.authService.login(this.loginForm.getRawValue()).subscribe(response => {
      //0 - bad req, 1 - success, 2 - wrong user or otp, 3 - OTP Expired
      this.isLoading = false;
      if (response != null && response.success && response.statusCode == this.numbersConstants.TWO_HUNDRED) {
        switch (response.result) {
          case this.numbersConstants.ONE :
            this.resetForm();
            this.route.navigateByUrl('dashboard').then();
            break;
          case this.numbersConstants.TWO :
            this.snackBar.warning(this.stringsConstants.WRONG_OTP);
            this.submittedOTP = false;
            break;
          case this.numbersConstants.THREE :
            this.snackBar.warning(this.stringsConstants.OTP_EXPIRED);
            this.resetForm();
            break;
          default:
            this.snackBar.error(this.stringsConstants.BAD_REQUEST);
            this.submittedOTP = false;
            break;
        }
      } else {
        this.snackBar.error(this.stringsConstants.INTERNAL_SERVER_ERROR);
        this.submittedOTP = false;
      }
    }, () => {
      this.isLoading = false;
      this.snackBar.warning(this.stringsConstants.BAD_REQUEST);
      this.submittedOTP = false;
    });
  }

  private resetForm(): void {
    this.submittedOTP = false;
    this.submittedUserName = false;
    this.loginForm.get('userName')?.enable();
    this.otp = '';
    this.loginForm.reset();
  }

  private timer(sec: number) {
    let seconds: number = sec;

    this.timerInterval = setInterval(() => {
      seconds--;
      this.display = `${seconds}`;
      if (seconds == 0) {
        this.snackBar.warning(this.stringsConstants.TIME_EXPIRED);
        this.resetForm();
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.getOTPSubscription.unsubscribe();
    clearInterval(this.timerInterval);
  }
}
