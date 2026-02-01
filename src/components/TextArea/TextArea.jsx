import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './TextArea.module.css';

const TextArea = ({
    id,
    name,
    value,
    onChange,
    label,
    disabled,
    required = false,
    placeholder = "",
    error = "false",
    errorMessage,
    rows = 4,
    className = "",
    onBlur
}) => {

    // Combine classes
    const textareaClasses = clsx(
        styles.textarea,
        error === "true" && styles.textareaError,
        className
    );

    return (
        <div className={styles.textareaWrapper}>
            {label && (
                <label 
                    htmlFor={id} 
                    className={styles.label}
                >
                    {label}
                </label>
            )}
            <textarea 
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                required={required}
                placeholder={placeholder}
                rows={rows}
                className={textareaClasses}
            />
            {error === "true" && errorMessage && (
                <small className={styles.errorMessage}>
                    {errorMessage}
                </small>
            )}
        </div>
    )
}

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    error: PropTypes.oneOf(['true', 'false']),
    errorMessage: PropTypes.string,
    rows: PropTypes.number,
    className: PropTypes.string,
    onBlur: PropTypes.func,
}

TextArea.defaultProps = {
    required: false,
    placeholder: "",
    error: "false",
    rows: 4,
    className: "",
}

export default TextArea