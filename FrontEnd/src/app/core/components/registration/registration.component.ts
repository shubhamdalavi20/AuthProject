import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {LoginModal} from '../../models/login.modal';
import {StringsConstants} from '../../constant/strings.constants';
import {NumbersConstants} from '../../constant/numbers.constants';
import {AuthenticationService} from "../../services/authentication.service";
import {SnackBarService} from "../snackbar/snack-bar.service";

@Component({
  selector: 'auth-app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public readonly stringsConstants = StringsConstants;
  public submittedUserName: boolean = false;

  public registrationForm!: FormGroup;
  public isLoading: boolean = false;

  private readonly numbersConstants = NumbersConstants;
  private registrationSubscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private snackBar: SnackBarService, private route: Router) {
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      userName: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ]
    });
  }

  public onRegister(value: LoginModal): void {
    this.submittedUserName = true;

    if (this.registrationForm.invalid && this.registrationForm.get('userName')?.errors) {
      if (this.registrationForm.get('userName')?.hasError('required')) {
        this.snackBar.warning(this.stringsConstants.USER_NAME + this.stringsConstants.IS_REQUIRED);
      } else if (this.registrationForm.get('userName')?.hasError('minlength')) {
        this.snackBar.warning(this.stringsConstants.USERNAME_MIN_LENGTH);
      } else if (this.registrationForm.get('userName')?.hasError('maxlength')) {
        this.snackBar.warning(this.stringsConstants.USERNAME_MAX_LENGTH);
      }
      this.submittedUserName = false;
      return;
    }
    this.isLoading = true;
    this.registrationSubscription = this.authService.registration(value).subscribe(response => {
      //0 - username already exist, 1 - success
      this.isLoading = false;
      if (response != null && response.success && response.statusCode == this.numbersConstants.TWO_HUNDRED) {
        switch (response.result) {
          case this.numbersConstants.ONE :
            this.registrationForm.reset();
            this.snackBar.success(this.stringsConstants.REGISTRATION_DONE_SUCCESSFULLY);
            this.route.navigateByUrl('login').then();
            break;
            case this.numbersConstants.ZERO :
              this.snackBar.warning(this.stringsConstants.USER_ALREADY_EXIST);
            break;
          default:
            this.snackBar.error(this.stringsConstants.BAD_REQUEST);
            break;
        }
      } else {
        this.snackBar.error(this.stringsConstants.INTERNAL_SERVER_ERROR);
      }
    }, () => {
      this.isLoading = false;
      this.snackBar.error(this.stringsConstants.INTERNAL_SERVER_ERROR);
    })
  }

  ngOnDestroy(): void {
    this.registrationSubscription.unsubscribe();
  }
}
