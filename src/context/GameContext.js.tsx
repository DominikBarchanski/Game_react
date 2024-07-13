import React, { createContext, useContext, useState, ReactNode } from 'react';
import { locations, possibleEnemies } from '../constants/gameData';
import { Enemy } from '../types';
import { fetchRandomImage } from '../util/fetchRandomImage'; // Import the utility function

interface CharacterStats {
    health: number;
    strength: number;
    level: number;
    lvlUpExp: number;
    experience: number;
}

interface GameState {
    character: CharacterStats;
    currentMap: string;
    gameStatus: 'active' | 'paused' | 'ended';
    battleEnemies: Enemy[];
}

interface GameContextType {
    gameState: GameState;
    updateCharacter: (stats: Partial<CharacterStats>) => void;
    changeMap: (map: string) => void;
    updateEnemies: (enemies: Enemy[]) => void;
    resetGame: () => void;
    enemy: Enemy | null;
    isFighting: boolean;
    turn: 'player' | 'enemy';
    startBattle: () => void;
    endBattle: () => void;
    setTurn: (turn: 'player' | 'enemy') => void;
}

const defaultState: GameState = {
    character: { health: 100, strength: 10, level: 1, lvlUpExp: (1 + 10) * 2, experience: 0 },
    currentMap: 'Forest',
    gameStatus: 'active',
    battleEnemies: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState>(defaultState);
    const [isFighting, setIsFighting] = useState(false);
    const [enemy, setEnemy] = useState<Enemy | null>(null);
    const [turn, setTurn] = useState<'player' | 'enemy'>('player');

    const updateCharacter = (updates: Partial<CharacterStats>) => {
        setGameState(prev => ({
            ...prev,
            character: { ...prev.character, ...updates },
        }));
    };

    const generateEnemy = async (enemyTemplate: Enemy): Promise<Enemy> => {
        const health = Math.floor(Math.random() * (enemyTemplate.healthRange[1] - enemyTemplate.healthRange[0] + 1)) + enemyTemplate.healthRange[0];
        const strength = Math.floor(Math.random() * (enemyTemplate.strengthRange[1] - enemyTemplate.strengthRange[0] + 1)) + enemyTemplate.strengthRange[0];
        const img = await fetchRandomImage();
        return { ...enemyTemplate, health, strength, img };
    };

    const changeMap = (locationName: string) => {
        const location = locations.find(loc => loc.name === locationName);
        if (!location) {
            throw new Error(`Location "${locationName}" not found`);
        }
        setGameState(prev => ({
            ...prev,
            currentMap: locationName,
        }));
    };

    const startBattle = async () => {
        const location = locations.find(loc => loc.name === gameState.currentMap);
        if (location) {
            const battleEnemies = await Promise.all(location.enemies.map(enemyTemplate => generateEnemy(enemyTemplate)));
            const randomEnemyIndex = Math.floor(Math.random() * battleEnemies.length);
            const selectedEnemy = battleEnemies[randomEnemyIndex];
            setIsFighting(true);
            setEnemy(selectedEnemy);
            setGameState(prev => ({ ...prev, battleEnemies }));
        }
    };

    const endBattle = () => {
        if (enemy) {
            updateCharacter({ experience: gameState.character.experience + enemy.experience });
        }
        setEnemy(null);
        setIsFighting(false);
    };

    const updateEnemies = (enemies: Enemy[]) => {
        setGameState(prev => ({ ...prev, battleEnemies: enemies }));
    };

    const resetGame = () => {
        setGameState(defaultState);
    };

    return (
        <GameContext.Provider
            value={{
                gameState,
                updateCharacter,
                changeMap,
                updateEnemies,
                resetGame,
                enemy,
                isFighting,
                turn,
                startBattle,
                endBattle,
                setTurn,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};
