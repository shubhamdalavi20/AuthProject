import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

import {SnackBarData} from './snack-bar-data.model';
import {StringsConstants} from '../../constant/strings.constants';

@Component({
  selector: 'auth-app-snackbar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
  public readonly stringsConstants = StringsConstants;

  constructor(public snackBarRef: MatSnackBarRef<SnackBarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public configurationData: SnackBarData) {
  }
}
