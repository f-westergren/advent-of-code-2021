const fs = require('fs');

fs.readFile('input.txt', function read(err, data) {
    if (err) {
        throw err;
    }

    let scans = data.toString().replace(/\r\n/g,'\n').split('\n');

    // Part 1
    let i = 0;
    let gamma = ''
    let epsilon = '';

    const getOxygenGeneratorCriteria = (bits, i) => {
        let zero = 0;
        let one = 0;
        for (let bit of bits) {
            bit[i] === '0' ? zero++ : one++
        }

        if (zero > one) return 0;
        if (zero < one) return 1;
        return 1;
    }

    const getCO2ScrubberCriteria = (bits, i) => {
        let zero = 0;
        let one = 0;
        for (let bit of bits) {
            bit[i] === '0' ? one++ : zero++
        }

        if (zero > one) return 0;
        if (zero < one) return 1;
        return 0;
    }
    
    while (i < scans[0].length) {

        if (getOxygenGeneratorCriteria(scans, i) == 0) {
            gamma += '0';
            epsilon += '1';
        } else {
            epsilon += '0';
            gamma += '1';
        }
        i++
    }

    console.log('Part 1', parseInt(gamma, 2) * parseInt(epsilon, 2))

    // Part 2
    const getOxygenGeneratorValue = (bits, criteria, i) => {
        let values = [];

        for (let bit of bits) {
            if (bit[i] == criteria) values.push(bit)
        }

        if (values.length === 1) return values[0]
        return getOxygenGeneratorValue(values, getOxygenGeneratorCriteria(values, i+1, 1), i+1)
    }

    const getCO2ScrubberValue = (bits, criteria, i) => {
        let values = [];

        for (let bit of bits) {
            if (bit[i] == criteria) values.push(bit)
        }

        if (values.length === 1) return values[0]
        return getCO2ScrubberValue(values, getCO2ScrubberCriteria(values, i+1, 1), i+1)
    }

    const oxygenRating = parseInt(getOxygenGeneratorValue(scans, getOxygenGeneratorCriteria(scans, 0), 0), 2)
    const scrubberRating = parseInt(getCO2ScrubberValue(scans, getCO2ScrubberCriteria(scans, 0), 0), 2)

    console.log('Part 2:', oxygenRating * scrubberRating)
});