import React, { useState } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard.js';
import MapSelection from '../MapSelection/MapSelection.js';
import { useNavigate } from 'react-router-dom';

import './MainScreen.module.css';
import { locations } from "../../constants/gameData";
import { useGameContext } from "../../context/GameContext.js";

const MainScreen: React.FC = () => {
    const [showMapSelection, setShowMapSelection] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const { changeMap, startBattle } = useGameContext();
    const navigate = useNavigate();

    const handleMapSelectionClick = () => {
        setShowMapSelection(true);
    };

    const handleLocationSelect = (locationName: string) => {
        setSelectedLocation(locationName);
        setShowMapSelection(false);
        changeMap(locationName);
    };

    const findEnemy = () => {
        startBattle();
        navigate('/Battle');
    };

    return (
        <div className="mainScreen">
            <h1>Simple game</h1>
            <CharacterCard />
            {showMapSelection ? (
                <MapSelection onLocationSelect={handleLocationSelect} />
            ) : (
                <>
                    <button className="btn btn-primary" onClick={handleMapSelectionClick}>Choose Map</button>
                    {selectedLocation && <p>Selected Location: {selectedLocation}</p>}
                    {/* The "Find Enemy" button should probably be disabled until a location is selected */}
                    <button className="btn btn-primary" onClick={findEnemy} disabled={!selectedLocation}>Find Enemy</button>
                </>
            )}
        </div>
    );
}

export default MainScreen;
