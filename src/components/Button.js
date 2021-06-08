import React from 'react';

const Button = (props) => {
    return (
        <button
            {...props}
            className={props.className ? `${props.className} custom-button` : 'custom-button'}
        >
            {props.children}
        </button>
    )
}

export default Button;
