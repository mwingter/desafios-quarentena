// This is the container of all Entities
const movableEntityContainer = document.getElementById('movable-entity-container');

const map = new GameMap(movableEntityContainer);
const player = new Player(movableEntityContainer);

// This is the game frame function. It is responsible for updating everything in the game.
function frame () {
	map.frame();
}

// This function will run every time the player presses a key
document.body.addEventListener('keydown', event => {
	// if that key is the spacebar, the player will try to throw it's hook.
	if (event.key === ' '){
		player.throwHook();	
	}
	if (event.key === 'z'){
		var bombs = document.getElementById("tnts").innerText;
		console.log("tenho " + bombs + " bombas.");
		if(bombs > 0 && player.hook.hookedObject instanceof Rock ){
			console.log("tenho bomba");
			player.hook.stopPulling();
			var tnt_number = parseInt(document.getElementById("tnts").innerText) - 1;
			document.getElementById("tnts").innerText = tnt_number; //updatind player tnt number on the screen
		}
	}
});


// Registers the frame function to run at every frame.
// if you'd like to know more about intervals, see this link
// https://javascript.info/settimeout-setinterval
const intervalHandler = setInterval(frame);
