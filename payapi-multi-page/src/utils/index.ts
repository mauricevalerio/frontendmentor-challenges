import type { validatorFieldTypes } from '@/types/index.ts';

export const validateInput = (name: string, value: string, validators: validatorFieldTypes): string => {
    for (let key in validators) {
        switch (key) {
            case 'pattern':
                const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^ <>()[\]\\.,;: \s @"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                if (!regex.test(value)) {
                    return `Must be a valid email address`
                }
                break;
            case 'required':
                const result = name.replace(/([A-Z])/g, " $1");
                const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                if (value.length === 0 && validators[key]) {
                    return `${finalResult} is required`;
                }
                break;

        }
    }
    return '';
}