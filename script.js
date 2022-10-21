let fields = [];
let gameOver = false;
let currentShape = 'cross'

let AUDIO_VIKING = new Audio('audio/screamingPeople.wav');
let AUDIO_WAR = new Audio('audio/drumOfWar.wav');
let AUDIO_CHRISTIAN = new Audio('audio/churchBell.wav');

function fillShape(id) {
    if (!fields[id] && !gameOver) {
        if (currentShape == 'circle') {
            currentShape = 'cross';
            crossClassToggle();
        } else {
            currentShape = 'circle'
            circleClassToggle();
        }
        fields[id] = currentShape;
        console.log(fields)
        draw();
        checkForWin();
    }
}

function crossClassToggle() {
    document.getElementById('player-1').classList.remove('player-inactive')
    document.getElementById('player-1').classList.add('player-active')
    document.getElementById('player-2').classList.add('player-inactive')
    document.getElementById('player-2').classList.remove('player-active')
}

function circleClassToggle() {
    document.getElementById('player-1').classList.add('player-inactive')
    document.getElementById('player-1').classList.remove('player-active')
    document.getElementById('player-2').classList.remove('player-inactive')
    document.getElementById('player-2').classList.add('player-active')
}


function draw() {
    for (i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById('circle-' + i).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById('cross-' + i).classList.remove('d-none');
        }
    }
}

function checkForWin() {
    let winner;
    // horizontale Siegmöglichkeiten / Wie kann man diese IF-Abfragen in eine gesonderte Funktion einfügen? Für besseren Clean Code.
    // Bekomme in gesonderten Functions den Wert von "Fields" und "Winner" nicht zurück.
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-1').style.transform = 'scaleX(1)'
    }
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-2').style.transform = 'scaleX(1)'
    }
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-3').style.transform = 'scaleX(1)'
    }
    // vertikale Siegmöglichkeiten / Wie kann man diese IF-Abfragen in eine gesonderte Funktion einfügen? Für besseren Clean Code.
    // Bekomme in gesonderten Functions den Wert von "Fields" und "Winner" nicht zurück.
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-4').style.transform = 'scaleX(1)'
    }
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-5').style.transform = 'scaleX(1)'
    }
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-6').style.transform = 'scaleX(1)'
    }
    // diagonale Siegmöglichkeiten / Wie kann man diese IF-Abfragen in eine gesonderte Funktion einfügen? Für besseren Clean Code.
    // Bekomme in gesonderten Functions den Wert von "Fields" und "Winner" nicht zurück.
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-7').style.transform = 'rotate(135deg) scaleX(1)'
    }
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-8').style.transform = 'rotate(45deg) scaleX(1)'
    }
    // Abbruchbedingung
    if (fields[0] && fields[1] && fields[2] && fields[3] && fields[4] && fields[5] && fields[6] && fields[7] && fields[8]) {
        document.getElementById('restart').classList.remove('d-none');
    }
    if (winner) {
        console.log('Gewonnen:', winner);
        gameOver = true;
        if (winner === 'circle') {
            playerOneWinClassesToggle();
        }
        if (winner === 'cross') {
            playerTwoWinClassesToggle();
        }
    }
}

function playerOneWinClassesToggle() {
    document.getElementById('player-2-d-none').classList.add('d-none');
    document.getElementById('player-2-gameover').classList.remove('d-none');
    document.getElementById('player-2').classList.add('player-inactive', 'red');
    document.getElementById('player-2').classList.remove('player-active');
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('player-1').classList.add('player-active', 'gold');
    AUDIO_WAR.play();
    document.getElementById('restart').classList.remove('d-none');
}

function playerTwoWinClassesToggle() {
    document.getElementById('player-1-d-none').classList.add('d-none');
    document.getElementById('player-1-gameover').classList.remove('d-none');
    document.getElementById('player-1').classList.add('player-inactive', 'red');
    document.getElementById('player-1').classList.remove('player-active');
    document.getElementById('player-2').classList.remove('player-inactive');
    document.getElementById('player-2').classList.add('player-active', 'gold');
    AUDIO_CHRISTIAN.play();
    document.getElementById('restart').classList.remove('d-none');
}

function restart() {
    gameOver = false;
    fields = [];
    currentShape = 'cross'
    resetAllClasses();
    for (i = 1; i < 9; i++) {
        document.getElementById('line-' + i).style.transform = 'scaleX(0)';
    }
    for (i = 0; i < 9; i++) {
        document.getElementById('circle-' + i).classList.add('d-none');
        document.getElementById('cross-' + i).classList.add('d-none');
    }
}

function resetAllClasses() {
    document.getElementById('restart').classList.add('d-none');
    document.getElementById('player-1-gameover').classList.add('d-none');
    document.getElementById('player-2-gameover').classList.add('d-none');
    document.getElementById('player-1').classList.remove('player-active', 'player-inactive', 'gold', 'red');
    document.getElementById('player-1').classList.add('player-active');
    document.getElementById('player-2').classList.remove('player-active', 'player-inactive', 'gold', 'red');
    document.getElementById('player-2').classList.add('player-inactive');
    document.getElementById('player-1-d-none').classList.remove('d-none');
    document.getElementById('player-2-d-none').classList.remove('d-none');
}