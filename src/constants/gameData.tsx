import { Location, Enemy } from '../types';

// export const enemies: Enemy[] = [
//     {
//         id: 'goblin',
//         name: 'Goblin',
//         healthRange: [20, 30],
//         strengthRange: [5, 10],
//         experience: 20,
//         health: 10,
//     },
// ];
export const possibleEnemies: Enemy[] = [
    {
        id: 'goblin',
        name: 'Goblin',
        strength: 5,
        healthRange: [20, 30],
        strengthRange: [5, 10],
        experience: 20,
        health: 0, // Initial health will be set when generating the enemy
    },
    {
        id: 'orc',
        name: 'Orc',
        strength: 15,
        healthRange: [30, 50],
        strengthRange: [10, 20],
        experience: 40,
        health: 0, // Initial health will be set when generating the enemy
    },
    // Add more possible enemies as needed
];
export const locations: Location[] = [
    {
        id: 'forest',
        name: 'Enchanted Forest',
        enemies: possibleEnemies.filter(e => e.id === 'goblin'), // Just an example, adjust as needed
    }, {
        id: 'jungle',
        name: 'Rainforest Jungle',
        enemies: possibleEnemies.filter(e => e.id === 'goblin'), // Just an example, adjust as needed
    },
];

