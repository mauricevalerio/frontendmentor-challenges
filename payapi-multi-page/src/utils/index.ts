import type { validatorFieldTypes } from '@/types/index.ts';

export const validateInput = (value: string, validators: validatorFieldTypes): string => {
    for (let key in validators) {
        switch (key) {
            case 'pattern':
                const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^ <>()[\]\\.,;: \s @"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                if (!regex.test(value)) {
                    return `Must be a valid email address`
                }
                break;
            case 'required':
                if (value.length === 0 && validators[key]) {
                    return `field is required`;
                }
                break;

        }
    }
    return '';
}