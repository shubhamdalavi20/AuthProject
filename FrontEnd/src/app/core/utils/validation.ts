
export class Validation {
  static validateInput(value: string | null | undefined): string {
      return (value === undefined || value === null || value === '') ? '' : value.trim();
  }
}
