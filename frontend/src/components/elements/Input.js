import React from 'react';


export default ({innerRef, placeholder, id, type}) => {
    return (
        <div className="row">
            <span> Username </span>
            <input ref={innerRef} placeholder={placeholder} id={id} type={type} />
        </div>
    );
};
