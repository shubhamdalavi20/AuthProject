import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'auth-app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() public isLoading: boolean = false;

  constructor() {debugger; }

}
