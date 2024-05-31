import React,{useState , useEffect} from 'react';
import { useGameContext } from '../../context/GameContext.js';

import {useNavigate} from "react-router-dom";
import styles from './Battle.module.css'; // Import the CSS file
const Battle: React.FC = () => {
    const { gameState, enemy, endBattle, turn, setTurn, isFighting } = useGameContext();
    const [experienceGained, setExperienceGained] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isFighting && enemy === null) {
            setTimeout(() => {
                navigate('/');
            }, 5000);
        }
    }, [isFighting, enemy, navigate]);
    if (!enemy) return <p>Loading battle... <button onClick={()=>navigate('/')}></button> </p>; // handle loading state
    if (!isFighting && enemy === null) {
        return (
            <div>
                <h2>Victory!</h2>
                <p>You gained {experienceGained} experience!</p>
                <p>Returning to main screen in 5 seconds...</p>
            </div>
        );
    }
    const battleLog = [];
    const battleLoop = () => {
        if (turn === 'player') {
            // Player's turn
            handlePlayerAction();
        } else {
            // Enemy's turn
            handleEnemyAction();
        }
    }
    const handleEnemyAction = () => {
        const enemyDamage = Math.floor(Math.random() * 10) + 1;

    }
    const handlePlayerAction = () => {
        // Perform player action, e.g. attack the enemy
        console.log(`Player attacks ${enemy.name}`);

        // Example of updating enemy state, need to adjust according to actual state management
        // setEnemy({ ...enemy, health: enemy.health - playerAttackDamage });
        enemy.health -= (gameState.character.strength)/10;

        console.log(`${enemy.name} health: ${enemy.health}`)
        // Check if enemy is defeated
        if (enemy.health <= 0) {
            setExperienceGained(enemy.experience);
            endBattle();
            // Update experience, etc.
        } else {
            // If enemy not defeated, set turn to enemy
            setTurn('enemy');
        }
        // TODO: Handle the enemy's action on their turn
    };

    // ... Rest of the component

    return (
        <div className={styles.battleContainer}>
            <div className={styles.rectangle}>
                <h2>Player</h2>
                <p>Health: {gameState.character.health}</p>
                <p>Strength: {gameState.character.strength}</p>
                <p>Experience: {gameState.character.experience}</p>
                {turn === 'player' && <button onClick={handlePlayerAction}>Attack</button>}
            </div>
            <div className={styles.rectangle}>
                <h2>Enemy: {enemy.name}</h2>
                <p>Health: {enemy.health}</p>
                <p>Strength: {enemy.strengthRange[1]}</p>
                {turn === 'enemy' && (<p>Waiting for enemy move...</p> )}
            </div>
            <button onClick={() => navigate('/')}>Return to main screen</button>
        </div>
    );
};

export default Battle;
