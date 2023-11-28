import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {SnackBarComponent} from './snack-bar.component';
import {StringsConstants} from '../../constant/strings.constants';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  public readonly stringsConstants = StringsConstants;

  constructor(private snackBar: MatSnackBar) {
  }

  public success(message: string): void {
    this.showSnackBar(this.stringsConstants.SUCCESS, message);
  }

  public error(message: string): void {
    this.showSnackBar(this.stringsConstants.ERROR, message);
  }

  public info(message: string): void {
    this.showSnackBar(this.stringsConstants.INFORMATION, message);
  }

  public warning(message: string): void {
    this.showSnackBar(this.stringsConstants.WARNING, message);
  }

  private showSnackBar(snackType: any, message: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: (snackType === this.stringsConstants.WARNING || snackType === this.stringsConstants.ERROR) ? 0 : 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: {message: message, snackType: snackType}
    });
  }
}
