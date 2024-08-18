import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatch (passwordToMatch: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordCheck = control.root.get(passwordToMatch);

    if (passwordCheck && passwordCheck.value !== control.value) {
      return { missMatch: true };
    }

    return null;
  };
}