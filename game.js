//import * as fs from 'fs'

import { getLevel } from "./getLevel.js";


let x = 13;
let y = 13;
let board = [];

let player = {
    x: 0,
    y: 0
}

board = [
    [
        '0', '0', '0', '0',
        '0', '0', '0', '0',
        '0', '0', '0', '0',
        '0'
    ],
    [
        '0', '0', '0', '0',
        '0', '0', '0', '0',
        '0', '0', '0', '0',
        '0'
    ],
    [
        '0', '0', '1', '1',
        '1', '1', '1', '1',
        '1', '1', '1', '0',
        '0'
    ],
    [
        '0', '0', '1', '0',
        '0', '0', '0', '0',
        '0', '0', '1', '0',
        '0'
    ],
    [
        '0', '0', '1', '0',
        '0', '0', '0', '0',
        '0', '0', '1', '0',
        '0'
    ],
    [
        '0', '0', '1', '0',
        '0', '0', '0', '0',
        '0', '0', '1', '0',
        '0'
    ],
    [
        '0', '0', '1', '0',
        '0', '0', '0', '0',
        '0', '0', '1', '0',
        '0'
    ],
    [
        '0', '0', '1', '0',
        '0', '0', '0', '0',
        '0', '0', '1', '0',
        '0'
    ],
    [
        '0', '0', '1', '0',
        '0', '0', '0', '0',
        '0', '0', '1', '0',
        '0'
    ],
    [
        '0', '0', '1', '0',
        '0', '0', '0', '0',
        '0', '0', '1', '0',
        '0'
    ],
    [
        '0', '0', '2', '1',
        '1', '1', '1', '1',
        '1', '1', '1', '0',
        '0'
    ],
    [
        '0', '0', '0', '0',
        '0', '0', '0', '0',
        '0', '0', '0', '0',
        '0'
    ],
    [
        '0', '0', '0', '0',
        '0', '0', '0', '0',
        '0', '0', '0', '0',
        '0'
    ]
]

let doneMove = true;

$(function () {
    loadGame();
})

export async function loadGame() {
    const $root = $('#root')
    $root.append(levelBuild())

    $(document).keydown(async function (e) {
        switch (e.keyCode) { // move to seperate function and make it return something
            case 39:
                e.preventDefault;
                if (doneMove) {
                    doneMove = false;
                    await move('right', doneMove);
                }

                break;
            case 38:
                e.preventDefault;
                if (doneMove) {
                    doneMove = false;
                    await move('up', doneMove);
                }
                break;
            case 37:
                e.preventDefault;
                if (doneMove) {
                    doneMove = false;
                    await move('left', doneMove);
                }
                break;
            case 40:
                e.preventDefault;
                if (doneMove) {
                    doneMove = false;
                    await move('down', doneMove);
                }
                break;
        }
    })
}



export const levelBuild = function () {

    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('id', 'board')

    let levelTable = document.createElement('table');
    tableDiv.append(levelTable);

    //let level = getLevel();
    let count = 0;
    for (let i = 0; i < y; i++) {
        // board[i] = [];

        let row = document.createElement('tr');
        row.setAttribute('class', i)
        for (let j = 0; j < x; j++) {
            // board[i][j] = level.charAt(count);
            let rowFiller = document.createElement('td');
            rowFiller.setAttribute('class', j)

            // if (board[i][j] == 2) {
            //     player.y = i;
            //     player.x = j;
            //     rowFiller.setAttribute('id', 'player')
            // }


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

            count++;
        }
        tableDiv.append(row);
        count += 2;
    }
    return tableDiv;
}

export async function move(dirction) {
    let findY;
    let findX;

    let speed = 10;

    if (dirction == 'right') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time

            $(findY).find(findX).attr('id', '')

            if (board[player.y][player.x + 1] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                clearInterval(test)
                $(findY).find(findX).attr('id', 'player')
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
                clearInterval(test)
                $(findY).find(findX).attr('id', 'player')
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
                clearInterval(test)
                $(findY).find(findX).attr('id', 'player')
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
                clearInterval(test)
                $(findY).find(findX).attr('id', 'player')
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
