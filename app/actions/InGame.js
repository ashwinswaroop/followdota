export const playerInGame = (details, heroIdentifier, p, m) => {
  return {
    type: 'PLAYER_INGAME',
    data: details,
    hero: heroIdentifier,
    pArray: p,
    mDetails: m
  };
};
