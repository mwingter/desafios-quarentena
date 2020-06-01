/* Countdown timer. When time is zero, the game is over. */

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var Interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            //timer = duration;
            clearInterval(Interval);
            gameOver();
        }
    }, 1000);
}

window.onload = function () {
    var totalGameTime = 60 * 2,
        display = document.querySelector('#time');
    startTimer(totalGameTime, display);
};

function gameOver(){
    var gameOver = document.getElementById("gameover");
    var points = document.getElementById("points");
    var nivel = document.getElementById("nivel");

    gameOver.innerText = "O TEMPO ACABOU!\n Pontos: " + points.innerText 
        + "\n Nível: " + nivel.innerText + "\nPressione F5 para jogar novamente.";

    gameOver.style.display = "block";
}