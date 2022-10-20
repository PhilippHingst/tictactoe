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
            document.getElementById('player-1').classList.remove('player-inactive')
            document.getElementById('player-1').classList.add('player-active')
            document.getElementById('player-2').classList.add('player-inactive')
            document.getElementById('player-2').classList.remove('player-active')
        } else {
            currentShape = 'circle'
            document.getElementById('player-1').classList.add('player-inactive')
            document.getElementById('player-1').classList.remove('player-active')
            document.getElementById('player-2').classList.remove('player-inactive')
            document.getElementById('player-2').classList.add('player-active')
        }

        fields[id] = currentShape;
        console.log(fields)
        draw();
        checkForWin();
    }
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

    // horizontale Siegmöglichkeiten
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
    // vertikale Siegmöglichkeiten
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
    // diagonale Siegmöglichkeiten
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-7').style.transform = 'rotate(135deg) scaleX(1)'
    }
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-8').style.transform = 'rotate(45deg) scaleX(1)'
    }
    if (winner) {
        console.log('Gewonnen:', winner);
        gameOver = true;
        if (winner === 'circle') {
            document.getElementById('player-2-d-none').classList.add('d-none');
            document.getElementById('player-2-gameover').classList.remove('d-none');
            document.getElementById('player-2').classList.add('player-inactive','red');
            document.getElementById('player-2').classList.remove('player-active');
            document.getElementById('player-1').classList.remove('player-inactive');
            document.getElementById('player-1').classList.add('player-active','gold');
            AUDIO_WAR.play();

        }
        if (winner === 'cross') {
            document.getElementById('player-1-d-none').classList.add('d-none');
            document.getElementById('player-1-gameover').classList.remove('d-none');
            document.getElementById('player-1').classList.add('player-inactive','red');
            document.getElementById('player-1').classList.remove('player-active');
            document.getElementById('player-2').classList.remove('player-inactive');
            document.getElementById('player-2').classList.add('player-active','gold');
            AUDIO_CHRISTIAN.play();
        }
    }
}