import React from 'react';
import AppHeader from './elements/AppHeader';
import AppBody from './elements/AppBody';

const App = ({ children }) => {
    return (
        <div className="App">
            <AppHeader>
                REACT-REDUX TODO LIST
            </AppHeader>
            <AppBody>
                {children}
            </AppBody>
        </div>
    );
};

export default App;
