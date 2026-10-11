import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const password = group.get(passwordKey);
        const confirmPassword = group.get(confirmPasswordKey);

        if (!password || !confirmPassword) return null;

        if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
            return null;
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true })
            return { passwordMismatch: true };
        } else {
            confirmPassword.setErrors(null);
            return null;
        }
    }
}