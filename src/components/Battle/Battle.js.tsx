import React, { useState, useEffect } from 'react';
import { useGameContext } from '../../context/GameContext.js';
import { useNavigate } from 'react-router-dom';
import styles from './Battle.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressBar } from 'react-bootstrap';
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
            <div className={styles.characterRow}>
                <div className={styles.characterContainer}>
                    <img
                        src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2334&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Character"
                        className={styles.characterImage}
                        width={100}
                        height={100}
                    />
                    <h2>Player</h2>
                    <ProgressBar now={gameState.character.health} max={100} label={`${gameState.character.health}`} style={{width:'100px'}}/>
                    <p>Health: {gameState.character.health}</p>
                    <p>Strength: {gameState.character.strength}</p>
                    <p>Experience: {gameState.character.experience}</p>
                    {turn === 'player' && <button onClick={handlePlayerAction}>Attack</button>}
                </div>
                <div className={styles.characterContainer}>
                    <h2>Enemy: {enemy.name}</h2>
                    <img src={enemy.img} alt={enemy.name} width={100} height={100}/>
                    <ProgressBar now={enemy.health} max={enemy.healthRange[1]} label={`${enemy.health}`} style={{width:'100px'}}/>
                    <p>Health: {enemy.health}</p>
                    <p>Strength: {enemy.strength}</p>
                    {turn === 'enemy' && <p>Waiting for enemy move...</p>}
                </div>
            </div>
            <div className={styles.returnButtonContainer}>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Return to main screen</button>
            </div>
        </div>

    );
};

export default Battle;