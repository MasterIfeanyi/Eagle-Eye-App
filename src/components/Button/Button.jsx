'use client'
import styles from "./Button.module.css"
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({
    className = "",
    onClick,
    disabled,
    type = "button",
    loading,
    variant = "primary",
    size = "medium",
    icon,
    children
}) => {

    // Combine classes using CSS Modules
    const buttonClasses = clsx(
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        className
    );

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
            className={buttonClasses}
        >
            {icon && icon}
            {children}
            {loading && (
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingCircle}></div>
                </div>
            )}
        </button>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'neutral', 'other']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    loading: PropTypes.bool,
    icon: PropTypes.node,
    children: PropTypes.node,
};

export default Button