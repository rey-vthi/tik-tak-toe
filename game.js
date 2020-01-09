const winningPositions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
];
let currentPlayerNumber = 1;
let currentPlayerSymbol;
let playersWinningChances = {'0': [], '1': []};
const players = ['X', '0'];

const updateCurrentPlayer = function() {
  currentPlayerNumber = +!currentPlayerNumber;
  currentPlayerSymbol = players[currentPlayerNumber];
};

const isCurrentPlayerWon = function(playerNumber, position) {
  playersWinningChances[playerNumber].push(+position);
  return winningPositions.some(isSubsetOf.bind(null, playerNumber));
};

const isNotWinning = function(playerPos, winningPos) {
  return playerPos.indexOf(winningPos) == -1;
};
const isSubsetOf = function(playerNumber, winningPos) {
  const playerPos = playersWinningChances[playerNumber];
  return !winningPos.some(isNotWinning.bind(null, playerPos));
};

const getAllocatedBoxes = function() {
  const allocatedOfP1 = playersWinningChances['0'];
  const allocatedOfP2 = playersWinningChances['1'];
  return {allocatedOfP1, allocatedOfP2};
};

const isBoardFilled = function() {
  const {allocatedOfP1, allocatedOfP2} = getAllocatedBoxes();
  const filledBoxesCount = allocatedOfP1.concat(allocatedOfP2).length;
  return filledBoxesCount === 9;
};

const isAlreadyAllocated = function(position) {
  const {allocatedOfP1, allocatedOfP2} = getAllocatedBoxes();
  const filledBoxes = allocatedOfP1.concat(allocatedOfP2);
  return filledBoxes.includes(+position);
};

const declareWinner = function(playerNumber) {
  const winner = `Player: ${playerNumber} WON`;
  document.getElementById('winner').innerHTML = winner;
  document.getElementById('player').style.display = 'none';
  document.getElementById('board').style.display = 'none';
};

const alertDrawMatch = function() {
  document.getElementById('winner').innerHTML = `MAtch draw`;
  document.getElementById('player').style.display = 'none';
  document.getElementById('board').style.display = 'none';
};

const allocate = function(event, position) {
  if (isAlreadyAllocated(position)) {
    return alert('this place has already allocated');
  }

  updateCurrentPlayer();
  event.toElement.innerText = currentPlayerSymbol;
  const playerDone = `player${currentPlayerNumber + 1}:Done`;
  document.getElementById('player').innerHTML = playerDone;

  if (isCurrentPlayerWon(currentPlayerNumber, position)) {
    declareWinner(currentPlayerNumber + 1);
    return;
  }
  if (isBoardFilled()) {
    alertDrawMatch();
  }
};
