import { useGameContext } from "../context/GameContext.js";

const useCharacterActions = () => {
    const { gameState, updateCharacter } = useGameContext();

    const evolveCharacter = () => {
        if (gameState.character.experience < gameState.character.lvlUpExp) {
            return;
        } else {
            updateCharacter({
                strength: gameState.character.strength + 5,
                health: gameState.character.health + 20,
                level: gameState.character.level + 1
            });
            updateCharacter({
                experience: gameState.character.experience - gameState.character.lvlUpExp,
                lvlUpExp: (gameState.character.level + 10) ** 2
            });
        }
    };

    const healCharacter = () => {
        if (gameState.character.experience >= 5) {
            updateCharacter({
                health: gameState.character.health + 10,
                experience: gameState.character.experience - 5
            });
        }
    };

    return { evolveCharacter, healCharacter };
};

export default useCharacterActions;
