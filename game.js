//import * as fs from 'fs'

//import { getLevel } from "./getLevel.js";

import { levelArray } from "./getLevel.js"


let x = 13;
let y = 13;
let board = [];

let player = {
    name: 'Philip Kim',
    x: 0,
    y: 0,
    moves: 0, // May add as part of scoreboard
    time: 0,
    won: false, // If true, stop the game, make something pop up either going to next level or restarting the maze
    level: 1 // starting level
}

let minMove = 3; // one less than winning move, different for all boards

let speed = 10; // speed of animation

let doneMove = true; // important for one move at a time

let firstMove = true; //variable for stopwatch

let stopWatch; // same


$(function () {
    loadGame();
})

export async function loadGame() {
    const $root = $('#root')
    $root.append(levelBuild(player.level))
    let timeScoreBoard = await getBoard(player.level, "time");
    let moveScoreBoard = await getBoard(player.level, "move");
    console.log(timeScoreBoard)



    $(document).keydown(async function (e) {
        switch (e.keyCode) { // move to seperate function and make it return something
            case 39:
                e.preventDefault;
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
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
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
                        await move('up');
                    }
                }
                break;
            case 37:
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
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
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
                        await move('down');
                    }
                }
                break;

            case 78: // Press N to go to next level
                console.log('nextLevel')
                player.level += 1; // Go to Next Level
                player.won = false;
                player.time = 0;
                player.moves = 0;
                stopWatch = 0;
                firstMove = true;
                console.log(player.level)
                timeScoreBoard = await getBoard(player.level, "time")
                console.log(timeScoreBoard)
                $('#board').replaceWith(levelBuild(player.level)) //temp 

                break;
            // turn these into functions
            case 82: // Press R to reset level
                console.log('reset Level')
                player.won = false;
                player.time = 0;
                player.moves = 0;
                stopWatch = 0;
                firstMove = true;
                console.log(player.level)
                $('#board').replaceWith(levelBuild(player.level))
                break
            case 69: // Press E to enter level
                timeScoreBoard.push({
                    "player": player.name,
                    "time": player.time,
                    "moves": player.moves
                })
                await updateBoard(player.level, 'time', timeScoreBoard)
                break
            case 84: //Press t to print time array
                let updateTest = await getBoard(player.level, 'time')
                console.log(updateTest)
                break
        }
    })

}

export const levelBuild = function (number) {
    number -= 1;

    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('id', 'board')

    let levelTable = document.createElement('table');
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
                        player.time = stopWatch / 1000;
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
                        player.time = stopWatch / 1000;
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
                        player.time = stopWatch / 1000;
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
                        player.time = stopWatch / 1000;
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

export async function getBoard(id, type) {
    let getURL = "http://localhost:3000/" + type + "/" + id;
    const result = await axios({
        method: 'get',
        url: getURL,

    })
    return result.data;
}

export async function updateBoard(id, type, array) {
    let updateURL = "http://localhost:3000/" + type + "/" + id;
    const result = await axios({
        method: 'put',
        url: updateURL,
        data: {
            body: array
        }
    })
}

export const resetBoard = function () {
    console.log('reset Level')
    //player.level += 1; // Go to Next Level
    player.won = false;
    player.time = 0;
    player.moves = 0;
    stopWatch = 0;
    firstMove = true;
    console.log(player.level)
    $('#board').replaceWith(levelBuild(player.level))
}

export async function nextLevel() {
    console.log('nextLevel')
    player.level += 1; // Go to Next Level
    player.won = false;
    player.time = 0;
    player.moves = 0;
    stopWatch = 0;
    firstMove = true;
    console.log(player.level)
    test = await getBoard(player.level, "time")
    console.log(test)
    $('#board').replaceWith(levelBuild(player.level)) //temp 
}

export async function handleUpdateBoard() {
    test.push({
        "player": player.name,
        "time": player.time,
        "moves": player.moves
    })
    await updateBoard(player.level, 'time', test)
}

export async function getMostRecent() {//Might not be needed
    test = await getBoard(player.level, 'time')
    console.log(updateTest)
}