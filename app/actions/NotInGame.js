export const playerNotInGame = (details) => {
  return {
    type: 'PLAYER_NOTINGAME',
    data: details
  };
};
