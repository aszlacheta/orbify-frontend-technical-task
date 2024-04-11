export interface IOnValidation {
    onValidation: (isValid: boolean | ((oldIsValid: boolean) => boolean)) => void;
}
