let modal = document.querySelector('.modal');
let playerName, highScore;
let nameForm = document.querySelector('.nameForm');
let gameBoardInside = document.querySelectorAll('.gameBoard div');
let xSrc = 'assets/x-solid.svg';
let oSrc = 'assets/o-solid.svg';

// function to get player name from localStorage if present
function getPlayerName()
{
    playerName = localStorage.getItem("playerName");
    if(playerName)
    {
        highScore = localStorage.getItem("highScore");
        modal.style = "display : none";
        setPlayerInfo();
        addClickEvent();
    }
    
    return playerName;
}

// function to set player name in localStorage
function setPlayerName()
{
    let textbox = document.querySelector('.nameForm input[type = text]');
    playerName = textbox.value;
    highScore = 0;
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("highScore", 0);
    modal.style = "display : none";
    setPlayerInfo();
    addClickEvent();
}

// function to set playerInfo on html
function setPlayerInfo()
{
    document.querySelector('.playerName').innerHTML = playerName;
    document.querySelector('.highScore').innerHTML = highScore;
}

// winning logic
function winner()
{
    let currMoves = [...document.querySelectorAll('.gameBoard div')];

    /* 
        * * *
        - - -
        - - -
    */
    if(currMoves[0].childNodes[0] && currMoves[1].childNodes[0] && currMoves[2].childNodes[0])
    {
        let a = currMoves[0].childNodes[0].getAttribute('src');
        let b = currMoves[1].childNodes[0].getAttribute('src');
        let c = currMoves[2].childNodes[0].getAttribute('src');
        if(a == b && b == c)
            return a;
    }
    
    /* 
        - - -
        * * *
        - - -
    */
    if(currMoves[3].childNodes[0] && currMoves[4].childNodes[0] && currMoves[5].childNodes[0])
    {
        let a = currMoves[3].childNodes[0].getAttribute('src');
        let b = currMoves[4].childNodes[0].getAttribute('src');
        let c = currMoves[5].childNodes[0].getAttribute('src');
        if(a == b && b == c)
            return a;
    }
    
    /* 
        - - -
        - - -
        * * *
    */
    if(currMoves[6].childNodes[0] && currMoves[7].childNodes[0] && currMoves[8].childNodes[0])
    {
        let a = currMoves[6].childNodes[0].getAttribute('src');
        let b = currMoves[7].childNodes[0].getAttribute('src');
        let c = currMoves[8].childNodes[0].getAttribute('src');
        if(a == b && b == c)
            return a;
    }
    
    /* 
        * - -
        * - -
        * - -
    */
    if(currMoves[0].childNodes[0] && currMoves[3].childNodes[0] && currMoves[6].childNodes[0])
    {
        let a = currMoves[0].childNodes[0].getAttribute('src');
        let b = currMoves[3].childNodes[0].getAttribute('src');
        let c = currMoves[6].childNodes[0].getAttribute('src');
        if(a == b && b == c)
            return a;
    }
    
    /* 
        - * -
        - * -
        - * -
    */
    if(currMoves[1].childNodes[0] && currMoves[4].childNodes[0] && currMoves[7].childNodes[0])
    {
        let a = currMoves[1].childNodes[0].getAttribute('src');
        let b = currMoves[4].childNodes[0].getAttribute('src');
        let c = currMoves[7].childNodes[0].getAttribute('src');
        if(a == b && b == c)
            return a;
    }
    
    /* 
        - - *
        - - *
        - - *
    */
    if(currMoves[2].childNodes[0] && currMoves[5].childNodes[0] && currMoves[8].childNodes[0])
    {
        let a = currMoves[2].childNodes[0].getAttribute('src');
        let b = currMoves[5].childNodes[0].getAttribute('src');
        let c = currMoves[8].childNodes[0].getAttribute('src');
        if(a == b && b == c)
            return a;
    }
    
    /* 
        * - -
        - * -
        - - *
    */
    if(currMoves[0].childNodes[0] && currMoves[4].childNodes[0] && currMoves[8].childNodes[0])
    {
        let a = currMoves[0].childNodes[0].getAttribute('src');
        let b = currMoves[4].childNodes[0].getAttribute('src');
        let c = currMoves[8].childNodes[0].getAttribute('src');
        if(a == b && b == c)
            return a;
    }
    
    /* 
        - - *
        - * -
        * - -
    */
    if(currMoves[2].childNodes[0] && currMoves[4].childNodes[0] && currMoves[6].childNodes[0])
    {
        let a = currMoves[2].childNodes[0].getAttribute('src');
        let b = currMoves[4].childNodes[0].getAttribute('src');
        let c = currMoves[6].childNodes[0].getAttribute('src');
        if(a == b && b == c)
            return a;
    } 
}

// function to remove move from gameBoardInside
function removeMove(target)
{
    let newArr = []
    let dummy = [...gameBoardInside]
    dummy.find((elem) => {
        if(elem != target)
        {
            newArr.push(elem);
        }
    });

    return newArr;
}

// function to Computer User Click
function handleComputerClick()
{
    let randomNum = Math.floor(Math.random() * (gameBoardInside.length - 1));
    let compMove = gameBoardInside[randomNum];
    if(compMove)
    {
        compMove.removeEventListener('click', handleUserClick);
        let o = document.createElement('img');
        o.src = oSrc;
        o.className = "absolute w-1/4";
        compMove.appendChild(o);
        gameBoardInside = removeMove(compMove);

        let win = winner();
        if(win)
        {
            resetGame('Computer');
            return;
        }
    }
}

// function to Handle User Click
function handleUserClick(e)
{
    let x = document.createElement('img');
    x.src = xSrc;
    x.className = "absolute w-1/4";
    e.target.appendChild(x);
    e.target.removeEventListener('click', handleUserClick);
    removeClickEvent();
    gameBoardInside = removeMove(e.target);

    let win = winner();
    if(win)
    {
        resetGame(playerName);
        return;
    }
    
    if(gameBoardInside.length == 0)
    {
        resetGame("TIE");
        return
    }

    setTimeout(() => 
    {
        handleComputerClick();
        addClickEvent();
    }, 1000);

}

// function to play Sound
function playSound(winner)
{
    switch (winner.toLowerCase()) 
    {
        case 'computer' : 
                            let lost = './assets/lost.mp3';
                            new Audio(lost).play();
                            break;
        case 'tie' : 
                            let tie = './assets/tie.mp3';
                            new Audio(tie).play();
                            break;
        default :
                            let win = './assets/win.mp3';
                            new Audio(win).play();
    }
}

// function to get winning message
function getWinningMsg(winner)
{
    let msg = "TIE";
    if(winner.toLowerCase() != msg.toLowerCase())
    {
        msg = `Winner is ${winner}`;
        if(winner.toLowerCase() != 'computer')
            setScore();

        playSound(winner);
        return msg;
    }

    playSound(msg);
    return msg;
}

// function to reset Game
function resetGame(winner)
{
    let gameBoardInside = document.querySelectorAll('.gameBoard div');
    for (let elem of gameBoardInside)
        elem.innerHTML = "";
    
    addClickEvent(gameBoardInside);
    let msg = getWinningMsg(winner);

    let displayWinnerModal = document.querySelector('.winner')
    displayWinnerModal.children[0].innerHTML = msg;
    displayWinnerModal.classList.toggle('hidden');
    setTimeout(() => {
        displayWinnerModal.classList.toggle('hidden');
    }, 2000);
}

// function to set Score
function setScore()
{
    /* Math.floor(((9 - gameBoardInside.length) / 2) + 1) // moves taken by user */
    let score = 10;
    let currScore = Number.parseInt(document.querySelector('.score').innerHTML);
    currScore += score;
    document.querySelector('.score').innerHTML = currScore;
    if(Number.parseInt(localStorage.getItem('highScore')) < currScore)
    {
        localStorage.setItem('highScore', currScore);
        document.querySelector('.highScore').innerHTML = currScore;
    }
}

// function to add event Listener
function addClickEvent(arr)
{
    if(arr)
        gameBoardInside = arr;
    
    for (let elem of gameBoardInside)
        elem.addEventListener('click', handleUserClick);
}

// function to remove event Listener
function removeClickEvent()
{
    for (let elem of gameBoardInside)
        elem.removeEventListener('click', handleUserClick);
}

window.addEventListener('load', () => 
{
    getPlayerName();
});

nameForm.addEventListener('submit', (e) => 
{
    e.preventDefault();
    setPlayerName();
});