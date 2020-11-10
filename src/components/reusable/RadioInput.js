import React from "react";
import PropTypes from 'prop-types';

const RadioInput = props => {
    const {
        id,
        name,
        onChange,
        className,
        value,
        error,
        labelClassName,
    } = props;

    return (
        <>
            <input
                id={id}
                name={name}
                type="radio"
                value={value}
                className={className}
                onChange={onChange}
                autoComplete="false"
            />
            <label
                style={{ border: error ? 'solid 1px red' : '' }}
                className={labelClassName}
                htmlFor={id}
            >
                { value }
            </label>
            {
                error ? <p style={{ color: 'red', fontSize: '14px'} } >{error}</p> : ''
            }
        </>
    )
}

RadioInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    labelClassName: PropTypes.string
}

export { RadioInput };