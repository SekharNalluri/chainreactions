function checkExplosion(square) {

    let squares = square.slice();

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
            if (squares[i][j]) {

                let value = Number(squares[i][j].split("-")[1]);
                let owner = squares[i][j].split("-")[0];
                //coners egdes and rest in order
                if ((i == 0 || i == 9) && (j == 0 || j == 5)) {
                    if (value >= 2) {
                        changeExlodedStates(squares, i, j);
                        return squares;
                    }
                } else if ((i == 0 || i == 9) || (j == 0 || j == 5)) {
                    if (value >= 3) {
                        changeExlodedStates(squares, i, j);
                        return squares;
                    }
                } else {
                    if (value >= 4) {
                        changeExlodedStates(squares, i, j);
                        return squares;
                    }
                }
            }
        }
    }
    return null;
}

function checkforWinner(square) {

    console.log('winner');


    let squares = square.slice();
    let count = 0, xCount = 0, oCount = 0;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
            if (squares[i][j]) {
                count = count + 1;
                if (squares[i][j].split("-")[0] == "X")
                    xCount = xCount + 1;
                else
                    oCount = oCount + 1;
            }
        }
    }

    if (xCount == 0 && count >= 2)
        return "Green is Winner"
    if (oCount == 0 && count >= 2)
        return "Red is Winner"

    return null;

}

function changeExlodedStates(squares, i, j) {

    let value = Number(squares[i][j].split("-")[1]);
    let owner = squares[i][j].split("-")[0];

    squares[i][j] = null;

    if (j + 1 < 6) {

        if (squares[i][j + 1])
            squares[i][j + 1] = owner + "-" + (Number(squares[i][j + 1].split("-")[1]) + 1);
        else
            squares[i][j + 1] = owner + "-" + 1;
    }

    if (j - 1 > -1) {
        if (squares[i][j - 1])
            squares[i][j - 1] = owner + "-" + (Number(squares[i][j - 1].split("-")[1]) + 1);
        else
            squares[i][j - 1] = owner + "-" + 1;
    }

    if (i - 1 > -1) {
        if (squares[i - 1][j])
            squares[i - 1][j] = owner + "-" + (Number(squares[i - 1][j].split("-")[1]) + 1);
        else
            squares[i - 1][j] = owner + "-" + 1;

    }

    if (i + 1 < 10) {
        if (squares[i + 1][j])
            squares[i + 1][j] = owner + "-" + (Number(squares[i + 1][j].split("-")[1]) + 1);
        else
            squares[i + 1][j] = owner + "-" + 1;
    }
}