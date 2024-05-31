import React from 'react';
import { GameProvider } from './context/GameContext.js'
import MainScreen from './components/MainScreen/MainScreen.js';
import BattleJs from './components/Battle/Battle.js'; // Import the BattleJs component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes from react-router-dom
import './App.css';

const App: React.FC = () => {
    return (
        <GameProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<MainScreen />} /> // MainScreen route
                        <Route path="/battle" element={<BattleJs />} /> // Battle route
                    </Routes>
                </div>
            </Router>
        </GameProvider>
    );
}

export default App;