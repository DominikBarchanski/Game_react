import React, { useState, useEffect } from 'react';
import { useGameContext } from '../../context/GameContext.js';
import { useNavigate } from 'react-router-dom';
import styles from './Battle.module.css';

const Battle: React.FC = () => {
    const { gameState, enemy, endBattle, turn, setTurn, isFighting } = useGameContext();
    const [experienceGained, setExperienceGained] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isFighting && enemy === null) {
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [isFighting, enemy, navigate]);

    // Ensure useEffect is above any early return
    useEffect(() => {
        if (turn === 'enemy') {
            handleEnemyAction();
        }
    }, [turn]);

    if (!enemy) {
        return (
            <p>Loading battle...
                <button onClick={() => navigate('/')}>Return to Main</button>
            </p>
        );
    }

    if (!isFighting && enemy === null) {
        return (
            <div>
                <h2>Victory!</h2>
                <p>You gained {experienceGained} experience!</p>
                <p>Returning to main screen in 5 seconds...</p>
            </div>
        );
    }

    const handleEnemyAction = () => {
        const actions = ['attack'];
        const action = actions[Math.floor(Math.random() * actions.length)];

        switch (action) {
            case 'attack':
                const enemyDamage = Math.floor(Math.random() * 10) + 1;
                console.log(`Enemy attacks for ${enemyDamage} damage!`);
                gameState.character.health -= enemyDamage;
                if (gameState.character.health <= 0) {
                    endBattle();
                } else {
                    setTurn('player');
                }
                break;
            case 'wait':
                console.log('Enemy is waiting...');
                setTurn('player');
                break;
            case 'flee':
                console.log('Enemy flees the battle!');
                endBattle();
                break;
            default:
                break;
        }
    };

    const handlePlayerAction = () => {
        console.log(`Player attacks ${enemy.name}`);
        enemy.health -= Math.floor(Math.random() * gameState.character.strength ) + 1;
        console.log(`${enemy.name} health: ${enemy.health}`);

        if (enemy.health <= 0) {
            setExperienceGained(enemy.experience);
            endBattle();
        } else {
            setTurn('enemy');
        }
    };

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
                {turn === 'enemy' && <p>Waiting for enemy move...</p>}
            </div>
            <button onClick={() => navigate('/')}>Return to main screen</button>
        </div>
    );
};

export default Battle;