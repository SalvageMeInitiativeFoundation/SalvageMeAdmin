
import {
    DIGITS_REG_EXP,
    EMAIL_REG_EXP,
    LOWER_CASE_REG_EXP,
    PHONE_VALIDATION_API_URL,
    PHONE_VALIDATION_API_KEY,
    SPECIAL_CHAR_REG_EXP,
    UPPER_CASE_REG_EXP
 } from "./constants";

const NUMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const isEmailValid = (email) => {
    if (email.length > 0) {
        const validEmail = EMAIL_REG_EXP.test(email); // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if (validEmail) {
            return [true, ""];
        }
        else {
            return [false, "Invalid email address"];
        }
    }
    else {
        return [false, "Invalid email address"];
    }
};

export function isContactValid(phoneNumber) {
    let digits;
    if (phoneNumber.charAt(0) === "+") {
        digits = phoneNumber.slice(1,-1);
    }
    else {
        digits = phoneNumber
    }

    for (let i = 0; i < digits.length; i++) {
        if (NUMS.includes(+digits.charAt(i))) {
            continue;
        }
        else {
            return [false, "Invalid contact"]
        }
    }
    return [true, ""]
};


export const isPasswordValid = (passwordInputValue) => {
    const minLengthRegExp   = /.{8,}/;

    const passwordLength       =  passwordInputValue.length;
    const uppercasePassword    =  UPPER_CASE_REG_EXP.test(passwordInputValue);  //  /(?=.*?[A-Z])/
    const lowercasePassword    =  LOWER_CASE_REG_EXP.test(passwordInputValue);  //  /(?=.*?[a-z])/
    const digitsPassword       =  DIGITS_REG_EXP.test(passwordInputValue);      //  /(?=.*?[0-9])/
    const specialCharPassword  =  SPECIAL_CHAR_REG_EXP.test(passwordInputValue); //  /(?=.*?[#?!@$%^&*-])/
    const minLengthPassword    =  minLengthRegExp.test(passwordInputValue);

    let errMsg = "";
    if(passwordLength===0){
            errMsg="Password is empty";
    }else if(!uppercasePassword){
            errMsg="At least one uppercase";
    }else if(!lowercasePassword){
            errMsg="At least one lowercase";
    }else if(!digitsPassword){
            errMsg="At least one digit";
    }else if(!specialCharPassword){
            errMsg="At least one special character";
    }else if(!minLengthPassword){
            errMsg="Minumum of 8 characters";
    }else{
        errMsg="";
    }

    if(errMsg.length === 0){
        return [true, ""];
    }
    else {
        return [false, errMsg];
    }
}


export const isConfirmPassword= (newPassword, confirmPassword)=>{
    if(newPassword.length>0 && confirmPassword.length>0){
       if(newPassword !== confirmPassword)
    {
        let errMsg="Password not matching";
        
        return false;
    }
    else{
        return true;
    } 
    }
    
}

export const handleImageErrors= (errorCode)=>{
    let message = "";
    
    switch (errorCode) {
        case "file-invalid-type":
            message = "Unsupported file format";
            break;
        case "file-too-large":
            message = "File too large";
            break;
        case "file-too-small":
            message = "File too small";
            break;
        case "too-many-files":
            message = "Too many files";
            break;
        default:
            message = "Invalid file";
      };
    return message
}