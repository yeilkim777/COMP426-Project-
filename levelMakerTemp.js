import * as fs from 'fs'
let board = [];

let x = 13;
let y = 13;

let count = 0
export const getLevel = function () {
    let level = fs.readFileSync("./levels/Level 19.map").toString()//.split("/n")
        
    for (let i = 0; i < y; i++) {
        board[i] = [];
        for (let j = 0; j < x; j++) {
            board[i][j] = level.charAt(count);
            count ++;
        }
        count += 2;
    }
    console.log(board)

}

getLevel()