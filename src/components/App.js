import React from 'react';

const App = ({ children }) => {
    return (
        <div className="App">
            <header className="light-blue accent-3 valign-wrapper">
                <h4 className="center-align">REACT-REDUX TODO LIST</h4>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col m6 s10 offset-m3 offset-s1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
