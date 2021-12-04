// Day 1

const fs = require('fs');

fs.readFile('input.txt', function read(err, data) {
    if (err) {
        throw err;
    }

    let scans = data.toString().replace(/\r\n/g,'\n').split('\n');
    scans = scans.map(s =>parseInt(s))
    let num = 0;

    // Part 1
    for (let i = 0;i<scans.length;i++) {
        if (scans[i] < scans[i+1]) num++
    }

    console.log('Part 1', num)

    // Part 2

    num = 0

    for (let i = 0;i<scans.length-3;i++) {
        if ((scans[i]+scans[i+1]+scans[i+2]) < (scans[i+1]+scans[i+2]+scans[i+3])) num++
    }

    console.log('Part 2', num)
});