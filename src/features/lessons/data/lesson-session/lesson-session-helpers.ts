export const isTokenSelected = (
  selectedTokenId: number | undefined,
  id: number,
) => selectedTokenId !== undefined && selectedTokenId === id;

export const isPaintedPhrasePart = (
  isPhraseModeEnabled: boolean,
  startId: number | undefined,
  endId: number | undefined,
  tokenId: number,
) => {
  if (!isPhraseModeEnabled) {
    return false;
  }

  if (startId === undefined) {
    return false;
  }

  if (startId === tokenId) {
    return true;
  }

  if (endId === undefined) {
    return false;
  }

  const from = Math.min(startId, endId);
  const to = Math.max(startId, endId);

  return tokenId >= from && tokenId <= to;
};
