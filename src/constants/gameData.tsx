import { Location, Enemy } from '../types';

export const enemies: Enemy[] = [
    {
        id: 'goblin',
        name: 'Goblin',
        healthRange: [20, 30],
        strengthRange: [5, 10],
        experience: 20,
        health: 10,
    },
];

export const locations: Location[] = [
    {
        id: 'forest',
        name: 'Enchanted Forest',
        enemies: enemies.filter(e => e.id === 'goblin'), // Just an example, adjust as needed
    }, {
        id: 'jungle',
        name: 'Rainforest Jungle',
        enemies: enemies.filter(e => e.id === 'goblin'), // Just an example, adjust as needed
    },
];

