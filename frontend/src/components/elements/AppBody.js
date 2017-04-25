import React from 'react';

export default ({children}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col m6 s10 offset-m3 offset-s1">
                    {children}
                </div>
            </div>
        </div>
    );
};
