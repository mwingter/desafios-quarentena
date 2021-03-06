const playerHpElement = document.getElementById('player-health');
const playerTotalHp = 274;
/*let playerHp = 274;
let playerType = "air";
let playerLvl = 0;
let playerXp = 0;*/
var getPower = 0;

class Char {
  constructor(hp, type, lvl, xp) {
    this.hp = hp;
    this.type = type;
    this.lvl = lvl;
    this.xp = xp;
  }
}

const player = new Char(274, "air", 0, 0);
//console.log(player.hp);

const opponentHpElement = document.getElementById('opponent-health');
const opponentTotalHp = 350;
/*let opponentHp = 292;
let opponentType = "water";
let opponentLvl = 0;
let opponentXp = 0;*/

const opponent = new Char(opponentTotalHp, "water", 0, 0);

const turnText = document.getElementById('text');
let isTurnHappening = false;
let opponentParalised = false;
let roundsParalised = 0;

const playerAttacks = {
  thunderShock: {
    power: 40,
    accuracy: 100,
    name: 'Fatal Blow',
    type: 'normal',
  },
  quickAttack: {
    power: 40,
    accuracy: 100,
    name: 'Magical Shock',
    type: 'electric',
  },
  thunder: {
    power: 110,
    accuracy: 70,
    name: 'Power Arrow',
    type: 'electric',
  },
  submission: {
    power: 80,
    accuracy: 80,
    name: 'Coma',
    type: 'fighting',
  },
  doubleAttack: {
    power: 100,
    accuracy: 70,
    name: 'Double Attack',
    type: 'fighting',
  },
  frostBlade: {
    power: 60,
    accuracy: 90,
    name: 'Frost Blade',
    type: 'ice',
  }
}

const opponentAttacks = {
  tackle: {
    power: 40,
    accuracy: 100,
    name: 'Burn Boost',
    type: 'normal',
  },
  bubble: {
    power: 40,
    accuracy: 100,
    name: 'Shock Boost',
    type: 'water',
  },
  waterGun: {
    power: 40,
    accuracy: 100,
    name: 'Freeze Boost',
    type: 'water',
  },
  hydroPump: {
    power: 110,
    accuracy: 80,
    name: 'Burning Touch',
    type: 'water',
  }
}

function gameOver (winner) {
  // Wait 1000 (Health loss animation)
  setTimeout(() => {
    // Update HTML text with the winner
    turnText.innerText = winner + ' is the winner!';
    // Open alert with the winner
    //alert(winner + ' is the winner! Close this alert to play again');
    if(winner == "Opponent"){
        window.alert(winner + ' is the winner! Close this alert to play again');
        window.location.reload();
    }
    else{
        var result = window.confirm(winner + ' is the winner! Clique OK para continuar jogando, ou CANCEL para começar de novo.');
        // Reload the game
        if (result == true) { 
            zerarOpponent();
            //console.log("continuar")
        } else { 
            window.location.reload();
            //console.log("parar")
    
        } 
    }

  }, 1000);
}

// Check if attacks misses
function willAttackMiss (accuracy) {
  //console.log(Math.floor(Math.random() * 100) > accuracy);
  return Math.floor(Math.random() * 100) > accuracy;
}

function updatePlayerHp(newHP) {
  // Prevents the HP to go lower than 0
  player.hp = Math.max(newHP, 0);

  // If player health is equal 0 opponent wins
  if (player.hp === 0) {
    gameOver('Opponent');
  }

  // Update the player hp bar
  const barWidth = (player.hp / playerTotalHp) * 100;
  playerHpElement.style.width = barWidth + '%';
}

function updateOpponentHp(newHP) {
  // Prevents the HP to go lower than 0
  opponent.hp = Math.max(newHP, 0);

  // If oppont health is equal 0 player wins
  if (opponent.hp === 0) {
    gameOver('Player');
  }

  // Update the opponents hp bar
  const barWidth = (opponent.hp / opponentTotalHp) * 100;
  opponentHpElement.style.width = barWidth + '%';
}


function zerarOpponent(){
    opponent.hp = 292;
    updateOpponentHp(292);
    opponent.lvl = 0;
    opponent.xp = 0;
}

//DESAFIO BONUS 4:
//Make characters evolve and win new attacks for an even more exciting Second Round!
function evolveChar(attack, char){
  var gainedXP = attack.power/2; //the XP gained is the attack power divided by 2
  if(char == "poring"){
    
    if(player.xp < 100){
      player.xp = player.xp + gainedXP;
    }
    if(player.xp >= 100){
        player.lvl = player.lvl + 1;
        player.xp = 0;
        getPower++;
        if(getPower == 1){ //por enquanto, ganha novos poderes na primeira vez que upar um level
            getNewPower();
        }
    }
    updateStatus(player.xp, player.lvl, char);
  }
  else{
    if(opponent.xp < 100){
      opponent.xp = opponent.xp + gainedXP;
    }
    if(opponent.xp >= 100){
      opponent.lvl = opponent.lvl + 1;
      opponent.xp = 0;
    }
    updateStatus(opponent.xp, opponent.lvl, char);
  }
}

function getNewPower(){
    window.alert("Parabéns, você evoluiu e ganhou dois novos ataques: Double Attack e Frost Blade");

    var doubleatk = document.createElement("BUTTON");
    doubleatk.id = "double-attack-button";
    doubleatk.innerText = "DOUBLE ATTACK";
    var frostbl = document.createElement("BUTTON");
    frostbl.id = "frost-blade-button";
    frostbl.innerText = "FROST BLADE";

    
    var newRow = document.createElement("DIV");
    newRow.className = "row";

    newRow.appendChild(doubleatk);
    newRow.appendChild(frostbl);

    document.getElementById("options").appendChild(newRow);

    doubleatk.addEventListener('click', function() {
        turn(playerAttacks.doubleAttack);
      });
    frostbl.addEventListener('click', function() {
        turn(playerAttacks.frostBlade);
    });
}



function updateStatus(myXp, myLvl, char){
  var id = "";
  if(char == "poring"){
    id = "porLevel";
  }
  else if(char == "bafome"){
    id = "bafLevel";
  }
  document.getElementById(id).innerHTML = "|<b>XP:</b> " + myXp + " |<b> Lv:</b> " + myLvl + "|"
}

//DESAFIO BONUS 3:
// Special property in 'Fatal Blow' that randonmly (50% chance) makes the opponent 
// paralise, not being able to attack for 2 rounds. If the opponent is already paralised, nothing happens.
function specialParalise(attack){
  if(attack.name == "Fatal Blow" && !willAttackMiss(50) && !opponentParalised){
    //console.log("Paralisado!!");
    opponentParalised = true;
  }
  else{
    //console.log("Nao paralisado")
  }
}


// DESAFIO BONUS 2:
// Weakness system that causes electric attacks to do double damage to water creatures
function eletricWeakness(attack){
  if(opponent.type == "water" && attack.type == "electric"){ 
    //console.log("FRACO") 
    return 2;  
  }
  else{
    return 1;
  }
}

//DESAFIO 1:
// *************************************************************************************
// Here you need to implement the player attack function that receives the used attack
// return false if attack misses
// otherwise update opponents health and return true
// *************************************************************************************
function playerAttack(attack) {
  //console.log(attack);
  // 0: return false if attack misses
  if(willAttackMiss(attack.accuracy) == true){
    //console.log("ERREI!");
    return false;
  }
  // 1: otherwise update opponents health and return true
  else{    
    var novoHp = opponent.hp;
    novoHp = novoHp - attack.power * eletricWeakness(attack);
    updateOpponentHp(novoHp);

    specialParalise(attack); //it may or may not paralise the enemy for 2 rounds
    if(opponentParalised){
      roundsParalised = roundsParalised + 1;
    }

    
    evolveChar(attack, "poring");

    return true;
  }
}

// *************************************************************************************
// Here you need to implement the opponent attack function that receives the used attack
// return false if attack misses
// otherwise update player health and return true
// *************************************************************************************

// opponent attack function that receives the used attack
function opponentAttack(attack) {
  //console.log(attack);
  // 0: return false if attack misses
  if(willAttackMiss(attack.accuracy) == true){
    //console.log("ERROU!");
    return false;
  } 
  // 1: otherwise update player health and return true
  else{
    var novoHp = player.hp;
    novoHp = novoHp - attack.power;
    updatePlayerHp(novoHp);

    evolveChar(attack, "bafome");

    return true;
  }
}

function chooseOpponentAttack () {
  // Put all opponents attacks in a array
  const possibleAttacks = Object.values(opponentAttacks);

  // Randomly chooses one attack from the array
  return possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)];
}

function turn(playerChosenAttack) {
  // Don't start another turn till the current one is not finished
  if (isTurnHappening) {
    return;
  }
  isTurnHappening = true;

  const didPlayerHit = playerAttack(playerChosenAttack);

  // Update HTML text with the used attack
  turnText.innerText = 'Player used ' + playerChosenAttack.name;

  // Update HTML text in case the attack misses
  if (!didPlayerHit) {
    turnText.innerText += ', but missed!';
  }

  // Wait 2000ms to execute opponent attack (Player attack animation time)
  setTimeout(() => {

    if(!opponentParalised && roundsParalised < 3){ //If the opponent is not paralised
      // Randomly chooses opponents attack
      const opponentChosenAttack = chooseOpponentAttack();

      const didOpponentHit = opponentAttack(opponentChosenAttack);

      // Update HTML text with the used attack
      turnText.innerText = 'Opponent used ' + opponentChosenAttack.name;

      // Update HTML text in case the attack misses
      if (!didOpponentHit) {
        turnText.innerText += ', but missed!';
      }
    }
    else{
      if(roundsParalised == 1){
        turnText.innerText = 'Opponent Paralised for 2 rounds!';
      }
      else if(roundsParalised == 2){
        turnText.innerText = 'Opponent Paralised for 1 more round!';
        roundsParalised = 0;
        opponentParalised = false;
      }
      if(roundsParalised == 3){
        
      }
    }


    // Wait 2000ms to end the turn (Opponent attack animation time)
    setTimeout(() => {
      // Update HTML text for the next turn
      turnText.innerText = 'Please choose one attack';
      isTurnHappening = false;
    }, 2000);
  }, 2000);
}

// Set buttons click interaction
document.getElementById('thunder-shock-button').addEventListener('click', function() {
  turn(playerAttacks.thunderShock);
});
document.getElementById('quick-attack-button').addEventListener('click', function() {
  turn(playerAttacks.quickAttack);
});
document.getElementById('thunder-button').addEventListener('click', function() {
  turn(playerAttacks.thunder);
});
document.getElementById('submission-button').addEventListener('click', function() {
  turn(playerAttacks.submission);
});

