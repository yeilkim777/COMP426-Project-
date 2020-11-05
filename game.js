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

$(function () {
    loadGame();
})

export async function loadGame () {
    const $root = $('#root')
    $root.append(levelBuild())

    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 39:
                await moveRight();
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
        row.setAttribute('id', i)
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
                //rowFiller.setAttribute('id', 'player')
            }

            row.append(rowFiller);

            count++;
        }
        tableDiv.append(row);
        count += 2;
    }
    console.log(tableDiv)
    return tableDiv;
}

export async function moveRight () {
    //make this asyn and await

    //while (board[player.y][player.x] != 0) {
        setInterval(function animateRight() {

            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            player.x += 1;
            if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                let findY = '#' + player.y;
                let findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
            } else {
                clearInterval();
            }
            
        }, 25)
        // function animateRight() {

        //     // color what ever space that color
        //     // Depending on how it is animated and logic; move one space at a time
        //     player.x += 1;
        //     if (board[player.y][player.x] >= 1) {
        //         board[player.y][player.x] = 2;
        //         let findY = '#' + player.y;
        //         let findX = '.' + player.x;
        //         $(findY).find(findX).attr('class', player.x + ' filled')
        //         console.log('reach right')
        //     } else {
        //         clearInterval();
        //     }
            
        // }
    //}
    
}


console.log(player.x + " " + player.y)