//import * as fs from 'fs'


export const getLevel = function() {
    let level = fs.readFileSync("./levels/Level 1.map").toString()//.split("/n")
    return level;
}

