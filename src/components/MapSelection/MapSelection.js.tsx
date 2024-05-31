import React from 'react';
import { locations } from '../../constants/gameData';

interface MapSelectionProps {
    onLocationSelect: (locationName: string) => void;
}

const MapSelection: React.FC<MapSelectionProps> = ({ onLocationSelect }) => {
    return (
        <div>
            <h2>Select a Location</h2>
            {locations.map(location => (
                <button key={location.id} onClick={() => onLocationSelect(location.name)}>
                    {location.name}
                </button>
            ))}
        </div>
    );
};

export default MapSelection;
