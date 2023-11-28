export class SnackBarData {
  public message: string;
  public snackType: string;

  constructor(message: string, snackType: string) {
    this.message = message;
    this.snackType = snackType;
  }
}
