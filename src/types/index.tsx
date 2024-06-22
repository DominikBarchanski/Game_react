export interface Enemy {
    id: string;
    name: string;
    strength: number;
    healthRange: [number, number]; // Min and max health
    strengthRange: [number, number]; // Min and max strength
    experience: number;
    health: number;
}

export interface Location {
    id: string;
    name: string;
    enemies: Enemy[];
}
