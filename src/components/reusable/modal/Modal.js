import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

const Modal = props => {
    const { header, visible, children, dismiss } = props;

    return (
        <>
            {
                visible ?
                <div className="modal-wrapper">
                    <div className="modal-box">
                        <div className="modal-box-header">
                            <h3>{header}</h3>
                            <button onClick={dismiss}>
                                X
                            </button>
                        </div>
                        {children}
                    </div>
                    <div className="modal-bg"></div>
                </div>
                : null
            }
        </>
    )
}

Modal.propTypes = {
    header: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    children: PropTypes.any.isRequired,
    dismiss: PropTypes.func.isRequired
};

export { Modal };