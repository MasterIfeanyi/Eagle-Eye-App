// src/validations/authSchemas.js
import * as Yup from 'yup'

export const signupValidationSchema = Yup.object({
    firstname: Yup.string()
        .trim()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters')
        .required('First name is required'),
    
    lastname: Yup.string()
        .trim()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters')
        .required('Last name is required'),
    
    email: Yup.string()
        .trim()
        .email('Invalid email address')
        .lowercase()
        .required('Email is required'),
    
    phoneNumber: Yup.string()
        .trim()
        .matches(
            /^[\d\s\-+()]+$/,
            'Phone number can only contain numbers, spaces, and dashes'
        )
        .test('valid-length', 'Phone number must be between 10-15 digits', (value) => {
            if (!value) return false
            const digitsOnly = value.replace(/[\s\-+()]/g, '')
            return digitsOnly.length >= 10 && digitsOnly.length <= 15
        })
        .required('Phone number is required'),
    
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password must not exceed 100 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        )
        .required('Password is required'),
    
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password')
})

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email('Invalid email address')
        .required('Email is required'),
    
    password: Yup.string()
        .required('Password is required')
})