import React, { useState } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard.js';
import MapSelection from '../MapSelection/MapSelection.js';
import { useNavigate } from 'react-router-dom';

import './MainScreen.module.css';
import {locations} from "../../constants/gameData";
import {useGameContext} from "../../context/GameContext.js";

const MainScreen: React.FC = () => {
    const [showMapSelection, setShowMapSelection] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const { startBattle } = useGameContext(); // Get this from your GameContext
    const navigate = useNavigate();

    const handleMapSelectionClick = () => {
        setShowMapSelection(true);
    };

    const handleLocationSelect = (locationName: string) => {
        setSelectedLocation(locationName);
        setShowMapSelection(false);
    };
    const findEnemy = () => {
        // Make sure the location exists before attempting to access its properties
        const location = locations.find(loc => loc.name === selectedLocation);
        console.log(location);
        if (location) {
            const randomEnemyIndex = Math.floor(Math.random() * location.enemies.length);
            const enemy = location.enemies[randomEnemyIndex];

            startBattle(enemy);
            // The rest of your battle setup logic

            // Navigate to the BattleJs screen
            navigate('/Battle');
        } else {
            console.error('Location not found');
            // Handle the error case, such as showing an error message to the user
        }
    };

    return (
        <div className="mainScreen">
            <h1>Game Title</h1>
            <CharacterCard />
            {showMapSelection ? (
                <MapSelection onLocationSelect={handleLocationSelect} />
            ) : (
                <>
                    <button onClick={handleMapSelectionClick}>Choose Map</button>
                    {selectedLocation && <p>Selected Location: {selectedLocation}</p>}
                    {/* The "Find Enemy" button should probably be disabled until a location is selected */}
                    <button onClick={findEnemy} disabled={!selectedLocation}>Find Enemy</button>
                </>
            )}
        </div>
    );
}

export default MainScreen;
