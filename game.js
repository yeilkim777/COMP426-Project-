import * as fs from 'fs'

let x = 13;
let y = 13;
let board = [];


export const levelBuild = function () {
    // 
    let level = fs.readFileSync("./levels/Level 2.map").toString()//.split("/n")
    let count = 0;
    for (let i = 0; i < y; i++) {
        board[i] = [];
        for (let j = 0; j < x; j++) {
            board[i][j] = level.charAt(count);
            count ++;
        }
        count += 2;
    }
    return board;
}
console.log(levelBuild());