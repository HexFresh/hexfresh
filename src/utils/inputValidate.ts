export const emailValidate = (email:string) => email.includes('@');

export const passwordValidate = (password:string) => password.length >= 8;

export const nameValidate = (name:string) => name.trim() !== '';

export const numberValidate = (number:string) => Number.isInteger(number);
