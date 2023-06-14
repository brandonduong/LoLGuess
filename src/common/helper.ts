export function calculateScore(
  placements: string[],
  guessedRank: string,
  rank: string,
  ranks: string[]
) {
  // Returns scored points and max score
  const MAX_POINTS = [8, 6, 3]; // For each correct placement (depending on how far guess was)
  const MAX_RANK_POOL = 9; // 9 ranks in total
  const MAX_RANK_POINTS = [36, 27, 13.5]; // If rank pool had all 9 ranks
  var score = 0;

  // Score for placement guesses
  for (let i = 0; i < placements.length; i++) {
    const distance = Math.abs(parseInt(placements[i]) - (i + 1));
    if (distance <= 2) {
      score += MAX_POINTS[distance];
    }
  }

  // Score for rank guess
  const selectedRankInd = ranks.indexOf(guessedRank);
  const verifiedRankInd = ranks.indexOf(rank);
  const currentMax = MAX_RANK_POINTS.map((x) => {
    if (ranks.length >= 4) {
      return Math.round(x * (ranks.length / MAX_RANK_POOL) * 100) / 100;
    } else {
      return 0;
    }
  }); // Depends on # of ranks in pool
  const distanceRank = Math.abs(selectedRankInd - verifiedRankInd);
  if (distanceRank <= 2 && ranks.length >= 4) {
    score += currentMax[distanceRank];
  }

  return [roundToTwo(score), MAX_POINTS[0] * 8 + currentMax![0]];
}

export function roundToTwo(round: number) {
  return Math.round(round * 100) / 100;
}
