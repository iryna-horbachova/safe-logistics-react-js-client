import React from "react";

const SubmitButton = props => {
    const {
        label,
        type,
        className,
        handleClick
    } = props;

    return (
        <>
            <button
                type={type}
                className={className}
                onClick={handleClick}
            >
                {label}
            </button>

        </>
    )
}

export { SubmitButton };