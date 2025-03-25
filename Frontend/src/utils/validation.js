// src/utils/validation.js

// Validate email format using regex
export const validateEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };
  
  // Validate phone number format
  export const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[0-9]{10}$/;  // Assuming 10-digit phone number
    return regex.test(phoneNumber);
  };
  
  // Validate password length (minimum 6 characters)
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  