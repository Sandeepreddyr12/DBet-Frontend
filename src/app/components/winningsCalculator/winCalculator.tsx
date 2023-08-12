
export default function winCalculator(
  sampleAmount1: number,
  sampleAmount2: number,
  teamA_stake: number,
  teamB_stake: number,
  playerStake_tA : number = 0,
  playerStake_tB : number = 0,
) {
  // console.log(
  //   'calcu--',
  //   sampleAmount1,
  //   sampleAmount2,
  //   teamA_stake,
  //   teamB_stake
  // );

  //below formula gives the predicted winnings/returns for every buck/sample-amount you placed on each team.

  let team1_Winings = sampleAmount1;
  let team2_Winings = sampleAmount2;

  if (sampleAmount1 * (teamB_stake + sampleAmount2) !== 0) {
    team1_Winings =
      ((sampleAmount1 + playerStake_tA) * (teamB_stake + sampleAmount2)) /
        (teamA_stake + sampleAmount1) +
      sampleAmount1 +
      playerStake_tA;
  }

  if (sampleAmount2 * (teamA_stake + sampleAmount1) !== 0) {
    team2_Winings =
      ((sampleAmount2 + playerStake_tB) * (teamA_stake + sampleAmount1)) /
        (teamB_stake + sampleAmount2) +
      sampleAmount2 +
      playerStake_tB;
  }

  console.log('calc-teamWinnigs', team1_Winings, team2_Winings);

  return { team1_Winings, team2_Winings };
}
