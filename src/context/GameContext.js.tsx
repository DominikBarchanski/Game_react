import React, { createContext, useContext, useState, ReactNode } from 'react';
import { locations, enemies } from '../constants/gameData';
import {Enemy} from "../types";

interface CharacterStats {
    health: number;
    strength: number;
    experience: number;
}

interface GameState {
    character: CharacterStats;
    currentMap: string;
    enemies: string[];
    gameStatus: 'active' | 'paused' | 'ended';
}

interface GameContextType {
    gameState: GameState;
    updateCharacter: (stats: Partial<CharacterStats>) => void;
    changeMap: (map: string) => void;
    updateEnemies: (enemies: string[]) => void;
    resetGame: () => void;
    enemy: Enemy | null;
    isFighting: boolean;
    turn: 'player' | 'enemy';
    startBattle: (enemy: Enemy) => void;
    endBattle: () => void;
    setTurn: (turn: 'player' | 'enemy') => void;
}

const defaultState: GameState = {
    character: { health: 100, strength: 10, experience: 0 },
    currentMap: 'Forest',
    enemies: [],
    gameStatus: 'active'
};
const initialGameState = {
    // ... other state initializations,
    turn: 'player' as 'player' | 'enemy', // Explicitly type the initial turn state
    // ... continue with other initializations,
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
            character: { ...prev.character, ...updates }
        }));
    };

    const changeMap = (locationName: string) => {
        // Find the location by name
        const location = locations.find(loc => loc.name === locationName);
        if (!location) {
            throw new Error(`Location "${locationName}" not found`);
        }

        // Randomly select an enemy from the location
        const randomEnemyIndex = Math.floor(Math.random() * location.enemies.length);
        const randomEnemy = location.enemies[randomEnemyIndex];

        setGameState(prev => ({
            ...prev,
            currentMap: locationName,
            currentEnemy: randomEnemy,
        }));
    };
    const startBattle = (enemy: Enemy) => {
        setIsFighting(true);
        setEnemy(enemy);
        // Optionally reset player and enemy state as needed
    };

    const endBattle = () => {
        if (enemy) {
            updateCharacter({ experience: gameState.character.experience + enemy.experience });
        }
        setEnemy(null);
        setIsFighting(false);
    };

    const updateEnemies = (enemies: string[]) => {
        setGameState(prev => ({ ...prev, enemies }));
    };

    const resetGame = () => {
        setGameState(defaultState);
    };

    return (
        <GameContext.Provider value={{ gameState, updateCharacter, changeMap, updateEnemies, resetGame,enemy,isFighting,turn, startBattle, endBattle, setTurn }}>
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
