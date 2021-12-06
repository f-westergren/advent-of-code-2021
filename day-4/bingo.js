const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let scans = data.toString().replace(/\r\n/g, "\n").split("\n");

  let allNums = scans[0];
  let boards = [];
  let board = [];

  const checkHoriz = (board, nums) => {
    let bingo = true;
    for (let row of board) {
      for (let num of row) {
        if (!nums.includes(num)) {
          bingo = false;
          break;
        }
      }
      if (bingo) break;
    }
    return bingo;
  };

  const checkVert = (board, nums) => {
    let bingo = true;
    let i = 0;

    while (i < board.length) {
      let col = [];
      for (let line of board) col.push(line[i]);
      for (let num of col) {
        if (!nums.includes(num)) {
          bingo = false;
        }
      }
      if (bingo) break;
      i++;
    }
    return bingo;
  };

  // Create the board.
  for (let i = 2; i < scans.length; i++) {
    let bingo = false;

    if (board.length === 5) {
      board = board.filter((x) => x !== "");
      boards.push(board);
      board = [];
    } else {
      if (scans[i].length === 0) continue;
      let row = scans[i].split(" ").filter((x) => x !== "");
      board.push(row);
    }
  }

  let i = 1;

  boards.forEach((board) => {
    while (i <= allNums.length) {
      if (checkHoriz(board, allNums.slice(0, i)))
        console.log("BINGO horz", board);
      if (checkVert(board, allNums.slice(0, i)))
        console.log("BINGO vert", board);
    }
  });
});
