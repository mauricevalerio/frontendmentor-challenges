export type validatorFieldTypes = {
    required: boolean;
    pattern?: boolean;
}

export type formFieldTypes = {
    text: string;
    validators: validatorFieldTypes;
    errorMessage: string;
}

export type formDataTypes = {
    fullName: formFieldTypes;
    email: formFieldTypes;
    companyName: formFieldTypes;
    messageTitle: formFieldTypes;
    messageContent: formFieldTypes;
}