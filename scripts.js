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
var $speed = 5;
var $dotSpeed = $speed / 2;
var $overlap = 60;
var $ghostSide = 'left';
var $ghostOverPos = 500;
var $ghostPos = -$ghostOverPos; //starting ghost position
var $ghostName;

var $dot = document.getElementsByClassName('dot');
var $dotContainer = document.querySelector('.dot-container');
var $dotQuantity = 6;
var $dotContainerWidth = document.querySelector('.dot-container').clientWidth;
var $dotDistance = $dotContainerWidth / $dotQuantity;
var $dotClone = [];
var $dotInterval = 200;
var $dotContainerOffset = 0;


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
    $('#debug #dot-container-offset').text('Dot Offset: ' + $dotContainerOffset);
    $('#debug #dot-distance').text('Dot Distance: ' + parseInt($dotDistance));
    $('#score').text($score);
}

function moveElements() {
    // Get ghost coords
    $ghostLeftBound = $('#ghost').position().left;
    $ghostRightBound = getRightBound($('#ghost'));

    // Move ghost towards right if pacman is facing left and ghost is on the left
    if($gameStarted && $pacmanDirection == 'left' && $dead == false && $ghostRightBound < ($pacmanLeftBound + $overlap) && $ghostSide == 'left' && $ghostPresent == true) {
        $('#ghost').css('left', $ghostPos);
        $ghostPos += $speed;
    }
    // Move ghost towards left if pacman is facing right and ghost is on the left
    if($gameStarted && $pacmanDirection == 'right' && $dead == false && $ghostSide == 'left' && $ghostPresent == true) {
        $('#ghost').css('left', $ghostPos);
        if($ghostPos > (-500)) {
            $ghostPos -= $speed / 3;
        } else if ($ghostPos <= (-500)) {
            $ghostPresent = false;
            $('#little-ghost').fadeOut(500);
        }
    }

    // Move ghost towards left if pacman is facing right and ghost is on the right
    if($gameStarted && $pacmanDirection == 'right' && $dead == false && $ghostLeftBound > ($pacmanRightBound - $overlap) && $ghostSide == 'right' && $ghostPresent == true) {
        $('#ghost').css('left', $ghostPos);
        $ghostPos -= $speed;
    }
    // Move ghost towards right if pacman is facing left and ghost is on the right
    if($gameStarted && $pacmanDirection == 'left' && $dead == false && $ghostSide == 'right' && $ghostPresent == true) {
        $('#ghost').css('left', $ghostPos);
        if($ghostPos < (1500)) {
            $ghostPos += $speed / 3;
        } else if ($ghostPos >= (1500)) {
            $ghostPresent = false;
            $('#little-ghost').fadeOut(500);
        }
    }

    


}

function faceDirection() {
    if($pacmanDirection == 'left') {
        $('#pacman').css('transform', 'scaleX(-1)');
        // if($dotSpeed < 0) $dotSpeed *= -1;
    } else {
        $('#pacman').css('transform', 'scaleX(1)');
        // if($dotSpeed > 0) $dotSpeed *= -1;
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
    $speed = 2;
    $overlap = 20;
    $ghostSide = 'left';

    // Set ghost initial position
    $('#ghost').css('left', $ghostPos);

    stopPacman();
}

function createDots() {
    for(var a = 0; a < $dotQuantity; a++) {
        $dotClone[a] = $dot[0].cloneNode(true);
    }

    var $pos = 0;
    for(var a = 0; a < $dotQuantity; a++) {
        $dot[a].after($dotClone[a]);
        $dot[a].style.left = $pos + 'px';
        $pos += $dotDistance;
   }
}

function moveDots() {
    if($gameStarted) {
        if(Math.abs($dotContainerOffset) <= $dotDistance) {
                $dotContainerOffset += $dotSpeed;
        } else {
            $dotContainerOffset = 0;
        }
    }
    if($pacmanDirection == "left") {
        $dotContainer.style.transform = 'translateX(' + $dotContainerOffset + 'px)';
    } else {
        $dotContainer.style.transform = 'translateX(-' + $dotContainerOffset + 'px)';
    }
}

$(document).ready(function() {
    createDots();
    setInterval(moveDots, 10);
    setInterval(updateDebug, 10);
    setInterval(moveElements, 10);
    setInterval(faceDirection, 10);

    if($ghostPresent == false) {
        setInterval(() => {
            setTimeout(() => {
                if($gameStarted) {
                    $ghostPresent = true;
                    $('#little-ghost').fadeIn(500);
                }
            }, $attackInterval);
        }, 4000);
    }

    setInterval(() => {
        if($gameStarted) checkCollision();
    }, 10);

    setInterval(() => {
        if($pacmanDirection == 'left' && !$ghostPresent) {
            $ghostSide = 'left';
            $ghostPos = -500;
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





