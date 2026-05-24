'use client'
import PropTypes from 'prop-types';
import styles from './Input.module.css'
import clsx from 'clsx';

const Input = ({
    id,
    label,
    type = "text",
    disabled,
    placeholder = "",
    required = false,
    onChange,
    value,
    className = "",
    icon = false,
    imgSrc,
    variant = "default",
    size = "medium",
    ...rest
  }) => {

    const inputClasses = clsx(
      styles.input,
      styles[variant],
      styles[size],
      disabled && styles.disabled,
      icon && styles.withIcon,
      className
    );

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input 
        id={id}
        type={type}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
        className={inputClasses}
      />
      {icon && (
        <image 
          src={imgSrc} 
          alt="icon" 
          className={styles.icon}
        />
      )}
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  icon: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'primary', 'outline']),
  imgSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default Input

