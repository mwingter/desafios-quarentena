// This is the container of all movableEntities
const movableEntityContainer = document.getElementById('movable-entity-container');
var points = document.getElementById("points");
var tempo = document.getElementById("time");
var gameIsOver = false;

// creates the single only map instance in the game.
// There should be only one map in the game, so it is a Singleton class.
// If you'd like to know more about the singleton pattern, see this link:
// https://en.wikipedia.org/wiki/Singleton_pattern
const map = new Map(movableEntityContainer, points);
console.log("index",points);

// creates the single only player instance in the game.
const player = new Player(
	movableEntityContainer,
	map,
	gameOver,
);

// This is the game frame function. It is responsible for updating everything in the game.
function frame () {
	map.frame();

	// if the player is pressing one of the keys, call the turn function
	if (pressedKeys['a'] || pressedKeys['ArrowLeft']) player.turn(-1);
	if (pressedKeys['d'] || pressedKeys['ArrowRight']) player.turn(1);
}

// This is a dictionary that will hold the keys that are being held down at the time.
// If you'd like to know more about dictionaries, see this link:
// https://pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs
const pressedKeys = {};

// This function will run every time the player presses a key
document.body.addEventListener('keydown', event => {
	// if that key is the spacebar, the player will shoot.
	if (event.key === ' ' && !pressedKeys[' ']) player.shoot();

	// add the pressed key to the pressedKey dictionary
	pressedKeys[event.key] = true;
});

// This function will run every time the player releases a key
document.body.addEventListener('keyup', event => {
	// removes the pressed key to the pressedKey dictionary
	delete pressedKeys[event.key];
});

// Registers the frame function to run at every frame.
// if you'd like to know more about intervals, see this link
// https://javascript.info/settimeout-setinterval
const intervalHandler = setInterval(frame);

// This is the function that will end the game
function gameOver () {
	// This will unregister the frame function, so nothing else will be updated
	clearInterval(intervalHandler);
	
	//alert('Você perdeu! Sobreviveu por ' + tempo.innerText + 's e explodiu ' + points.innerText + ' asteroids!!!');

	var screen = document.getElementById("gameover");
	screen.innerText = "VOCÊ PERDEU!\n Asteroids explodidos: " + points.innerText 
						+ "\n Tempo: " + tempo.innerText + " segundos\nTecle F5 para jogar novamente.";
	screen.style.display = "block";


	gameIsOver = true;
}

function timeUp(){
	if(gameIsOver){
		clearInterval(gameLoopInterval);
		return;
	}
	//var start = Date.now();
	var gameLoopInterval = setInterval(() => {
		//var delta = Date.now() - start; // milliseconds elapsed since start

		var time = parseInt(tempo.innerText);
		time += 1;
		
		tempo.innerText = time;

	}, 1000); // update about every second
}

timeUp();