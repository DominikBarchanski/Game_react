import React from 'react';
import './CharacterCard.module.css';
import { useGameContext } from "../../context/GameContext.js"; // Adjust the path as needed

const CharacterCard: React.FC = () => {
    // Access the context
    const { gameState, updateCharacter } = useGameContext();

    const evolveCharacter = () => {
        updateCharacter({
            strength: gameState.character.strength + 5,
            health: gameState.character.health + 20
        });
    };

    return (
        <div className="characterCard">
            <h2>Character Stats</h2>
            <p>Health: {gameState.character.health}</p>
            <p>Strength: {gameState.character.strength}</p>
            <p>Experience: {gameState.character.experience}</p>
            <button onClick={evolveCharacter}>Evolve Character</button>
        </div>
    );
}

export default CharacterCard;
