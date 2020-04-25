import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LayoutManager from './Components/Layout/LayoutManager';

const App = () => {

    return (
        <div className="App">
            <Router>
                    <Route path="/" component={LayoutManager} />
            </Router>
        </div>
    )
}

export default App