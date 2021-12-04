const fs = require('fs');

fs.readFile('input.txt', function read(err, data) {
    if (err) {
        throw err;
    }

    let scans = data.toString().replace(/\r\n/g,'\n').split('\n');
    let depth = 0;
    let position = 0

    // Part 1
    for (let scan of scans) {
        let direction = scan.split(' ')[0]
        let distance = parseInt(scan.split(' ')[1])

        switch(direction) {
            case 'up':
                depth -= distance
                break;
            case 'down':
                depth += distance
                break;
            case 'forward':
                position += distance
                break;
        }
    }

    console.log('Part 1:', depth * position)

    // Part 2
    depth = 0;
    position = 0
    let aim = 0;


    for (let scan of scans) {
        let direction = scan.split(' ')[0]
        let distance = parseInt(scan.split(' ')[1])

        switch(direction) {
            case 'up':
                aim -= distance
                break;
            case 'down':
                aim += distance
                break;
            case 'forward':
                position += distance
                depth += aim * distance
                break;
        }
    }

    console.log('Part 2:', depth * position)
});