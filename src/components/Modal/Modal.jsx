'use client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ isShown, children, onClose }) => {

    useEffect(() => {
        if (!isShown) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);

        return () => document.removeEventListener('keydown', handleEscape);

    }, [isShown, onClose])

    const modal = (
        <div 
            className={styles.overlay} 
            onClick={(e) => {
                if (e.target === e.currentTarget && onClose) {
                    onClose();
                }
            }}
        >
            {children}
        </div>
    );

    return isShown ? createPortal(modal, document.getElementById("modal-root")) : null;
}

Modal.propTypes = {
    isShown: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal