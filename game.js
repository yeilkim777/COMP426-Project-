import { levelArray } from "./getLevel.js"
import { boardGet, boardSet } from "./backend-firestore.js"
//import { testUser } from "./login/login.js"


let x = 13;
let y = 13;
let board = [];

let player = {
    name: 'philip kim',//substring(0,testUser.email.indexOf('@')),
    x: 0,
    y: 0,
    moves: 0,
    time: 0,
    won: false, // If true, stop the game, make something pop up either going to next level or restarting the maze
    level: 1 // starting level
}

let minMove = 3;

let speed = 10; // speed of animation

let doneMove = true; // important for one move at a time

let firstMove = true; //variable for stopwatch
let stopWatch; // same

let timeScoreBoard = [] //contains player object {player: name, time: 000}
let moveScoreBoard = [] //contains player object {player: name, moves: 000}
//There is a dummy object in each array
//can add in rank element or something, but you must add it to all the dummy objects

$(function () {
    loadGame();
})

let myTime = null;

export async function loadGame() {

    const $root = $('#root')
    //div id = board width 650px, no margin
    timeScoreBoard = await getTimeBoard(player.level);
    moveScoreBoard = await getMoveBoard(player.level);
    $root.append(levelBuild(player.level))
    console.log(timeScoreBoard);
    console.log(moveScoreBoard);



    $(document).keydown(async function (e) {
        switch (e.keyCode) { // move to seperate function and make it return something
            case 39:
                e.preventDefault;
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;


                        myTime = window.setInterval(function () {

                            let gjh = (Date.now() - stopWatch) / 1000
                            const $timeboard = $('#timeboard');
                            $timeboard.empty();
                            $timeboard.append(`<h1>Time: ${gjh}</h1>`);
                        }, 1);
                    }
                    if (doneMove) {
                        doneMove = false;
                        if (board[player.y][player.x + 1] != 0) {
                            player.moves +=1;
                        }
                        const $moveboard = $('#moveboard');
                        $moveboard.empty();
                        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
                        await move('right');
                    }
                }

                break;
            case 38:
                e.preventDefault;
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;

                        myTime = window.setInterval(function () {

                            let gjh = (Date.now() - stopWatch) / 1000
                            const $timeboard = $('#timeboard');
                            $timeboard.empty();
                            $timeboard.append(`<h1>Time: ${gjh}</h1>`);
                        }, 1);
                    }
                    if (doneMove) {
                        doneMove = false;
                        if (board[player.y - 1][player.x] != 0) {
                            player.moves += 1
                        }
                        const $moveboard = $('#moveboard');
                        $moveboard.empty();
                        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
                        await move('up');
                    }
                }
                break;
            case 37:
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;

                        myTime = window.setInterval(function () {

                            let gjh = (Date.now() - stopWatch) / 1000
                            const $timeboard = $('#timeboard');
                            $timeboard.empty();
                            $timeboard.append(`<h1>Time: ${gjh}</h1>`);
                        }, 1);
                    }
                    if (doneMove) {
                        doneMove = false;
                        if (board[player.y][player.x - 1] != 0) {
                            player.moves += 1
                        }
                        const $moveboard = $('#moveboard');
                        $moveboard.empty();
                        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);

                        await move('left');
                    }
                }
                break;
            case 40:
                e.preventDefault;
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;

                        myTime = window.setInterval(function () {

                            let gjh = (Date.now() - stopWatch) / 1000
                            const $timeboard = $('#timeboard');
                            $timeboard.empty();
                            $timeboard.append(`<h1>Time: ${gjh}</h1>`);
                        }, 1);
                    }
                    if (doneMove) {
                        doneMove = false;
                        if (board[player.y + 1][player.x] != 0) {
                            player.moves += 1
                        }
                        
                        const $moveboard = $('#moveboard');
                        $moveboard.empty();
                        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
                        await move('down');
                    }
                }
                break;

            case 78: // Press N to go to next level
                nextLevel()

                break;
            // turn these into functions
            case 82: // Press R to reset level
                resetBoard()
                break
        }
    })

    $root.append(`<div id = 'buttonPanel'>
        <button id = 'previous'> Previous</button>
        <button id = 'reset'>Reset</button>
        <button id = 'next'>Next</button>
        <button id = 'time'>Save Time</button>
        <button id = 'move'>Save Move</button>
    </div>`)

    $root.append(`<div id = 'moveboard'>
        <h1>Moves: ${player.moves}</h1>
    </div>`)

    $root.append(`<div id = 'timeboard'>
        <h1>Time: ${player.time}</h1>
    </div>`)

    $root.on('click', "#previous", previousBoard);//self explantory
    $root.on('click', "#reset", resetBoard);
    $root.on('click', "#next", nextLevel);
    $root.on('click', "#time", timeUpdateBoard);//add in new player object to the array, it also returns the updated array
    $root.on('click', "#move", moveUpdateBoard);//add in new player object to the array, it also returns the updated array

    // $root.append(`<div>
    //     <table id = 'times'></table>
    // </div>`)

    // $root.append(`<div>
    //     <table id = 'moves'></table>
    // </div>`)
    // create keyboard functionality all of them

}

export const levelBuild = function (number) {
    number -= 1;

    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('id', 'board')
    let levelTable = document.createElement('table');
    levelTable.style = 'display: inline-block'
    tableDiv.append(levelTable);

    //let level = getLevel();
    let count = 0;

    board = JSON.parse(JSON.stringify(levelArray[number]))
    for (let i = 0; i < y; i++) {

        let row = document.createElement('tr');
        row.setAttribute('class', i)
        for (let j = 0; j < x; j++) {
            let rowFiller = document.createElement('td');
            rowFiller.setAttribute('class', j)

            if (board[i][j] == 0) {
                rowFiller.setAttribute('style', 'background-color: gray');
            } else if (board[i][j] == 1) {
                rowFiller.setAttribute('style', 'background-color: white');
            } else if (board[i][j] == 2) {
                //Player
                rowFiller.setAttribute('class', j + ' filled');
            }

            if (board[i][j] == 2) {
                player.y = i;
                player.x = j;
                rowFiller.setAttribute('id', 'player')
            }

            row.append(rowFiller);

            //count++;
        }
        tableDiv.append(row);
        //count += 2;
    }
    return tableDiv;
}

export async function move(dirction) {
    let findY;
    let findX;

    if (dirction == 'right') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y][player.x + 1] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker()
                    if (player.won) {
                        console.log('Won')
                        
                        stopWatch = Date.now() - stopWatch;
                        clearInterval(myTime);
                        player.time = stopWatch / 1000;
                        const $timeboard = $('#timeboard');
                        $timeboard.empty();
                        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.x += 1;
            }
            $(findY).find(findX).attr('id', 'player')

        }, speed)
    } else if (dirction == 'up') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y - 1][player.x] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker()
                    if (player.won) {
                        console.log('Won')
                
                        stopWatch = Date.now() - stopWatch;
                        clearInterval(myTime);
                        player.time = stopWatch / 1000;
                        const $timeboard = $('#timeboard');
                        $timeboard.empty();
                        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.y -= 1;
            }
            $(findY).find(findX).attr('id', 'player')
        }, speed)
    } else if (dirction == 'left') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y][player.x - 1] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker()
                    if (player.won) {
                        console.log('Won')
                        
                        stopWatch = Date.now() - stopWatch;
                        clearInterval(myTime);
                        player.time = stopWatch / 1000;
                        const $timeboard = $('#timeboard');
                        $timeboard.empty();
                        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.x -= 1;
            }
            $(findY).find(findX).attr('id', 'player')
        }, speed)
    } else if (dirction == 'down') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y + 1][player.x] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                //$(findY).find(findX).attr('class', player.x + ' filled')

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker();
                    if (player.won) {
                        console.log('Won')
                        
                        stopWatch = Date.now() - stopWatch;
                        clearInterval(myTime);
                        player.time = stopWatch / 1000;
                        const $timeboard = $('#timeboard');
                        $timeboard.empty();
                        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.y += 1;
            }
            $(findY).find(findX).attr('id', 'player')
        }, speed)
    }
}

export const boardChecker = function () {
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (board[i][j] == 1) {
                return player.won = false;

            }
        }
    }
    return player.won = true;
}

export async function getTimeBoard(id) {
    return await boardGet(id, 'time');
}

export async function getMoveBoard(id) {
    return await boardGet(id, 'move');
}

export async function updateBoard(id, type, array) {
    const result = await boardSet(id, type, array);
}

export async function previousBoard() {
    if (player.level - 1 != 0) {
        console.log('previousLevel')
        player.level -= 1; // Go to Next Level
        player.won = false;
        player.time = 0;
        player.moves = 0;
        stopWatch = 0;
        firstMove = true;
        console.log(player.level)
        clearInterval(myTime);
        const $timeboard = $('#timeboard');
        $timeboard.empty();
        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
        const $moveboard = $('#moveboard');
        $moveboard.empty();
        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
        timeScoreBoard = await getTimeBoard(player.level);
        moveScoreBoard = await getMoveBoard(player.level);
        $('#board').replaceWith(levelBuild(player.level))
    }
}

export const resetBoard = function () {
    console.log('reset Level')
    //player.level += 1; // Go to Next Level
    player.won = false;
    player.time = 0;
    player.moves = 0;
    stopWatch = 0;
    firstMove = true;
    clearInterval(myTime);
    const $timeboard = $('#timeboard');
    $timeboard.empty();
    $timeboard.append(`<h1>Time: ${player.time}</h1>`);
    const $moveboard = $('#moveboard');
    $moveboard.empty();
    $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
    console.log(player.level)
    $('#board').replaceWith(levelBuild(player.level))
}

export async function nextLevel() {
    if (player.level + 1 != 21) {
        console.log('nextLevel')
        player.level += 1; // Go to Next Level
        player.won = false;
        player.time = 0;
        player.moves = 0;
        stopWatch = 0;
        firstMove = true;
        clearInterval(myTime);
        const $timeboard = $('#timeboard');
        $timeboard.empty();
        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
        const $moveboard = $('#moveboard');
        $moveboard.empty();
        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
        console.log(player.level)
        timeScoreBoard = await getTimeBoard(player.level);
        moveScoreBoard = await getMoveBoard(player.level);
        console.log(timeScoreBoard)
        console.log(moveScoreBoard)
        $('#board').replaceWith(levelBuild(player.level))
    }
}

export async function timeUpdateBoard() {
    console.log(player)
    if (player.time == 0)
        return null
    let test = {
        "player": "player.name",
        "time": player.time,
    }
    
    await updateBoard(player.level, "time", timeScoreBoard)
    timeScoreBoard = await getTimeBoard(player.level);
    //let timeDiv = document.createElement("div")
    //timeDiv.id = "times"

    timeScoreBoard.push(test)
    timeScoreBoard.sort(function(a,b) {
        return a.time - b.time
    })
    let timeTable = document.createElement("table")
    timeTable.id = "times"
    timeTable.style = "border: 2px solid black;border-collapse: collapse;width: 15%; background-color: powderblue; float: left; text-align: center"
    //timeDiv.append(timeTable)
    let timeRowHeader = document.createElement("tr")
    timeRowHeader.style = "background-color: blue; font-family: sans-serif;color: white"
    let timeHeader0 = document.createElement("th")
    timeHeader0.innerText = ""
    let timeHeader1 = document.createElement("th")
    timeHeader1.innerText = "Player"
    let timeHeader2 = document.createElement("th")
    timeHeader2.innerText = "Time"
    
    timeRowHeader.append(timeHeader0)
    timeRowHeader.append(timeHeader1)
    timeRowHeader.append(timeHeader2)
    timeTable.append(timeRowHeader)
    
    /*
    lettimeTable2 = document.createElement("ol")
    timeTable2.id = "times"
    timeTable2.style = "border: 2px solid black; width: 10%; background-color: white; float: left; text-align: center"
    */
    //timeScoreBoard.forEach(e => {

    for (let i =0; i < 10 && i < timeScoreBoard.length; i++) {
        let e = timeScoreBoard[i]
        let timeRow = document.createElement("tr")
        let timeData0 = document.createElement("td")
        timeData0.innerText = `${i+1}`
        let timeData1 = document.createElement("td")
        timeData1.innerText = `${e.player}`
        let timeData2 = document.createElement("td")
        timeData2.innerText = `${e.time}`
        timeRow.append(timeData0)
        timeRow.append(timeData1)
        timeRow.append(timeData2)
        timeTable.append(timeRow)
        /** 
        timeRow2 = document.createElement("li")
        timeRow2.innerText = `${e.player} ${e.time}`
        timeTable2.append(timeRow2)
        */
    //});
    }
    document.getElementById("times").replaceWith(timeTable)
}

export async function moveUpdateBoard() {
    if (player.moves == 0)
        return null
    moveScoreBoard.push({
        "player": "player.name",
        "moves": player.moves,
    })

    

    await updateBoard(player.level, 'move', moveScoreBoard)
    moveScoreBoard = await getMoveBoard(player.level);
    console.log(moveScoreBoard);

    moveScoreBoard.sort(function(a,b) {
        return a.moves - b.moves
    }) 

    //let moveDiv = document.createElement("div")
    //moveDiv.id = "moves"
    let moveTable = document.createElement("table")
    moveTable.id = "moves"
    moveTable.style = "border: 2px solid black; width: 15%; border-collapse: collapse;background-color: tomato; float: left; text-align: center"
    //moveDiv.append(moveTable)
    let moveRowHeader = document.createElement("tr")
    moveRowHeader.style = "background-color: red; color: white;font-family: sans-serif"
    let moveHeader0 = document.createElement("th")
    moveHeader0.innerText = ""
    let moveHeader1 = document.createElement("th")
    moveHeader1.innerText = "Player"
    let moveHeader2 = document.createElement("th")
    moveHeader2.innerText = "Moves"
    moveRowHeader.append(moveHeader0)
    moveRowHeader.append(moveHeader1)
    moveRowHeader.append(moveHeader2)
    moveTable.append(moveRowHeader)

    //moveScoreBoard.forEach(e => {
    for (let i =0; i < 10 && i < moveScoreBoard.length; i++) {
        let e = moveScoreBoard[i]
        let moveRow = document.createElement("tr")
        let moveData0 = document.createElement("td")
        moveData0.innerText = `${i+1}`
        let moveData1 = document.createElement("td")
        moveData1.innerText = `${e.player}`
        let moveData2 = document.createElement("td")
        moveData2.innerText = `${e.moves}`
        moveRow.append(moveData0)
        moveRow.append(moveData1)
        moveRow.append(moveData2)
        moveTable.append(moveRow)
    //});
    }
    document.getElementById("moves").replaceWith(moveTable)
}

