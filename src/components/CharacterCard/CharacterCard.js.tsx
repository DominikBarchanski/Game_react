import React from 'react';
import styles from './CharacterCard.module.css';
import { useGameContext } from "../../context/GameContext.js"; // Adjust the path as needed
import useCharacterActions from '../../hook/useCharacterActions';
import 'bootstrap/dist/css/bootstrap.min.css';
const CharacterCard: React.FC = () => {
    // Access the context
    const { gameState, updateCharacter } = useGameContext();
    const { evolveCharacter, healCharacter } = useCharacterActions();

    // const evolveCharacter = () => {
    //
    //     if (gameState.character.experience < gameState.character.lvlUpExp) {
    //         return;
    //     }else {
    //         updateCharacter({
    //             strength: gameState.character.strength + 5,
    //             health: gameState.character.health + 20,
    //             level: gameState.character.level + 1
    //         });
    //         gameState.character.experience -= gameState.character.lvlUpExp;
    //         gameState.character.lvlUpExp = (gameState.character.level +10)**2;
    //     }
    // };

    return (
        <div className={styles.characterCard}>
            <div >
                <img
                    src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2334&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Character"
                    className="character-image"
                    width={500}
                    height={500}
                />

            </div>
            <div className={styles.stats}>
                <h2>Character Stats</h2>
                <p>Health: {gameState.character.health}</p>
                <p>Strength: {gameState.character.strength}</p>
            <p>Level: {gameState.character.level}</p>
            <p>Experience: {gameState.character.experience}/{gameState.character.lvlUpExp}</p>
            <button className="btn btn-primary" onClick={evolveCharacter}>Evolve Character</button>
            <button className="btn btn-primary" onClick={healCharacter}>Heal Character</button>

            </div>
        </div>
    );
}

export default CharacterCard;
