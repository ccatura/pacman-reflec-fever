var $gameStarted = false;
var $score = 0;
var $energized = false;
var $dead = false;
var $pacmanDirection = 'left';
var $ghostPresent = false;
var $ghostPersonas = ['blinky', 'pinky', 'inky', 'clyde'];
var $ghostDirection = 'right';
var $attackInterval = 1000;
var $pacmanLeftBound = $('#pacman').position().left;
var $pacmanRightBound = getRightBound($('#pacman'));
var $ghostLeftBound;
var $ghostRightBound;
var $ghostSpeed = 5;
var $overlap = 60;
var $ghostSide = 'left';
var $ghostOverPos = 300;
var $ghostPos = -$ghostOverPos; //starting ghost position
var $ghostName;

// Set ghost initial position
$('#ghost').css('left', $ghostPos);

stopPacman();


$(document).keydown(function(e){
    
    if(!$dead) {
        switch(e.which) {
            case 37: {
                $pacmanDirection = 'left';
                break;
            }
            case 39: {
                $pacmanDirection = 'right';
                break;
            }
            case 83: {
                $gameStarted = true;
                startPacman();
                break;
            }
            case 81: {
                $('#debug').toggle();
                break;
            }
        }
    }

    if($pacmanDirection == 'left') {
        $ghostDirection = 'right';
    } else {
        $ghostDirection = 'left';
    }
});













function dead() {
    $dead = true;
    $('.play-top').text('Game Over');
    $('.play-top').css('color', 'red');
    stopPacman();
}

function stopPacman() {
    $('#pacman').css('animation-play-state', 'paused');
}

function startPacman() {
    $('#pacman').css('animation-play-state', 'running');
}

function getRightBound(left) {
    return left.position().left + left.width();        
}

function pickGhost() {
    r = $ghostPersonas[Math.floor(Math.random() * 4)];
    return r;
}

function updateDebug() {
    $('#debug #pac-dir').text('Pac Dir: ' + $pacmanDirection);
    $('#debug #energized').text('Energized: ' + $energized);
    $('#debug #ghost-present').text('Ghost Dir: ' + $ghostPresent);
    $('#debug #ghost-dir').text('Ghost Dir: ' + $ghostDirection);
    $('#debug #game-started').text('Game Started: ' + $gameStarted);
    $('#debug #ghost-left-bound').text('Ghost Left Bound: ' + parseInt($ghostLeftBound));
    $('#debug #ghost-right-bound').text('Ghost Right Bound: ' + parseInt($ghostRightBound));
    $('#debug #pacman-left-bound').text('Pacman Left Bound: ' + $pacmanLeftBound);
    $('#debug #pacman-right-bound').text('Pacman Right Bound: ' + $pacmanRightBound);
    $('#debug #ghost-present').text('Ghost Present: ' + $ghostPresent);
    $('#debug #ghost-side').text('Ghost Side: ' + $ghostSide);
    $('#debug #dead').text('Pacman Dead: ' + $dead);
    $('#debug #ghost-name').text('Ghost: ' + $ghostName);
    $('#score').text($score);
}

function moveGhost() {
    // Get ghost coords
    $ghostLeftBound = $('#ghost').position().left;
    $ghostRightBound = getRightBound($('#ghost'));

    // Move ghost towards right if pacman is facing left and ghost is on the left
    if($gameStarted && $pacmanDirection == 'left' && $dead == false && $ghostRightBound < ($pacmanLeftBound + $overlap) && $ghostSide == 'left' && $ghostPresent == true) {
        $('#ghost').css('left', $ghostPos);
        $ghostPos += $ghostSpeed;
    }
    // Move ghost towards left if pacman is facing right and ghost is on the left
    if($gameStarted && $pacmanDirection == 'right' && $dead == false && $ghostSide == 'left' && $ghostPresent == true) {
        $('#ghost').css('left', $ghostPos);
        if($ghostPos > (-300)) {
            $ghostPos -= $ghostSpeed / 3;
        } else if ($ghostPos <= (-300)) {
            $ghostPresent = false;
        }
    }

    // Move ghost towards left if pacman is facing right and ghost is on the right
    if($gameStarted && $pacmanDirection == 'right' && $dead == false && $ghostLeftBound > ($pacmanRightBound - $overlap) && $ghostSide == 'right' && $ghostPresent == true) {
        $('#ghost').css('left', $ghostPos);
        $ghostPos -= $ghostSpeed;
    }
    // Move ghost towards right if pacman is facing left and ghost is on the right
    if($gameStarted && $pacmanDirection == 'left' && $dead == false && $ghostSide == 'right' && $ghostPresent == true) {
        $('#ghost').css('left', $ghostPos);
        if($ghostPos < (1500)) {
            $ghostPos += $ghostSpeed / 3;
        } else if ($ghostPos >= (1500)) {
            $ghostPresent = false;
        }
    }
}

function faceDirection() {
    if($pacmanDirection == 'left') {
        $('#pacman').css('transform', 'scaleX(-1)');
    } else {
        $('#pacman').css('transform', 'scaleX(1)');
    }

    if($ghostSide == 'left') {
        $('#ghost').css('transform', 'scaleX(1)');
    } else {
        $('#ghost').css('transform', 'scaleX(-1)');
    }
}

function checkCollision() {
    // if ($ghostDirection == 'right' && $ghostSide == 'left' && $ghostRightBound >= ($pacmanLeftBound + $overlap)) {
    //     dead();
    //     // resetGame();
    // }
}

function resetGame() {
    $gameStarted = false;
    $score = 0;
    $energized = false;
    $dead = false;
    $pacmanDirection = 'left';
    $ghostPresent = false;
    $ghostDirection = 'right';
    $ghostSpeed = 2;
    $overlap = 20;
    $ghostSide = 'left';

    // Set ghost initial position
    $('#ghost').css('left', $ghostPos);

    stopPacman();
}

$(document).ready(function() {
    setInterval(updateDebug, 10);
    setInterval(moveGhost, 10);
    setInterval(faceDirection, 10);

    if($ghostPresent == false) {
        setInterval(() => {
            setTimeout(() => {
                if($gameStarted) $ghostPresent = true;
            }, $attackInterval);
        }, 4000);
    }

    setInterval(() => {
        if($gameStarted) checkCollision();
    }, 10);

    setInterval(() => {
        if($pacmanDirection == 'left' && !$ghostPresent) {
            $ghostSide = 'left';
            $ghostPos = -300;
        } else if($pacmanDirection == 'right' && !$ghostPresent) {
            $ghostSide = 'right';
            $ghostPos = 1500;
        }
        $('#ghost').css('left', $ghostPos);
    }, 10);
    
    // Picks ghost
    setInterval(() => {
        if(!$ghostPresent) {
            $ghostName = pickGhost();
        }
        $('#ghost, #little-ghost').css("animation-name", $ghostName );
    }, 1000);

});





