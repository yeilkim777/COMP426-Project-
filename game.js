import * as fs from 'fs'


export const levelBuild = function () {
    let fs = require("fs");
    let level = fs.readFileSync("./levels/Level1.map").toString()//.split("/n")
    //let level = "./levels/Level 1.map";
    return level;
}

console.log(levelBuild());