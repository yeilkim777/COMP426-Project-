import * as fs from 'fs'

let x = 13;
let y = 13;


export const levelBuild = function () {
    let level = fs.readFileSync("./levels/Level 2.map").toString()//.split("/n")
    console.log(level.charAt(14));
    return level;
}

console.log(levelBuild());