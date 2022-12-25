var $gameStarted = false;
var $pacmanDirection = 'left';
var $energized = false;
var $ghostPresent = false;
var $ghostDirection = 'right';
var $score = 0;
var $attackInterval = 3000;
var $pacmanLeftBound = $('#pacman').position().left;
var $pacmanRightBound = getRight($('#pacman'));
var $ghostLeftBound;
var $ghostRightBound;
var ghostSpeed = 5000;
var $overlap = 20;
var $dead = false;
var $ghostSide = 'left';
var $ghostPos = 0 - $('#ghost').width() - 50;


$('#ghost').css('left', $ghostPos);



$(document).keydown(function(e){
    switch(e.which) {
        case 37: $pacmanDirection = 'left'; break;
        case 39: $pacmanDirection = 'right'; break;
        case 83: $gameStarted = true; break;
    }

    if($pacmanDirection == 'left') {
        $ghostDirection = 'right';
    } else {
        $ghostDirection = 'left';
    }
});















function getRight(left) {
    return left.position().left + left.width();        
}

function updateDebug() {
    $('#debug #pac-dir').text('Pac Dir: ' + $pacmanDirection);
    $('#debug #energized').text('Energized: ' + $energized);
    $('#debug #ghost-present').text('Ghost Dir: ' + $ghostPresent);
    $('#debug #ghost-dir').text('Ghost Dir: ' + $ghostDirection);
    $('#debug #game-started').text('Game Started: ' + $gameStarted);
    $('#pacman').text($pacmanDirection);
    $('#ghost').text($ghostDirection);
    $('#debug #ghost-left-bound').text('Ghost Left Bound: ' + parseInt($ghostLeftBound));
    $('#debug #ghost-right-bound').text('Ghost Right Bound: ' + parseInt($ghostRightBound));
    $('#debug #pacman-left-bound').text('Pacman Left Bound: ' + $pacmanLeftBound);
    $('#debug #pacman-right-bound').text('Pacman Right Bound: ' + $pacmanRightBound);
    $('#debug #dead').text('Pacman Dead: ' + $dead);
    $('#score').text($score);
}

function moveGhost() {
    // Get ghost coords
    $ghostLeftBound = $('#ghost').position().left;
    $ghostRightBound = getRight($('#ghost'));

    // if($gameStarted && $pacmanDirection == 'right' && $dead == false && $ghostLeftBound > $pacmanRightBound && !$('#ghost').is(':animated')) {
    //     $('#ghost').css('left', $('.play-middle').width());
    //     $('#ghost').animate({left: '50%'}, 5000, 'linear');
    //     console.log('hi');
    // }

    // Move ghost towards right if pacman is facing left
    if($gameStarted && $pacmanDirection == 'left' && $dead == false && $ghostRightBound < $pacmanLeftBound && !$('#ghost').is(':animated')) {
        $('#ghost').animate({left: '50%'}, 5000, 'linear');
    }
}

function checkCollision() {
    if($pacmanDirection == 'left' && $ghostRightBound - $overlap > $pacmanLeftBound) {
        $('#ghost').stop();
        $dead = true;
        $('.play-top').text('Game Over');
        $('.play-top').css('color', 'red');
    }
}

$(document).ready(function() {
    setInterval(updateDebug, 10);
    setInterval(moveGhost, 10)
    // setInterval(checkCollision, 10);
});
