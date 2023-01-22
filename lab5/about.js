const board = [
	null, null, null, null, null, null, null, null,
	null, null, null, null, null, null, null, null,
	null, null, null, null, null, null, null, null,
	null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
];

const boardHelper = [
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
];

const cells = document.querySelectorAll(".cell");
const completeButton = document.getElementById("move-button-complete");
const cancelButton = document.getElementById("move-button-cancel");
const blackCells = document.querySelectorAll(".dark");
const textArea = document.getElementById("textarea");
let brownPieces = document.querySelectorAll(".brown");
let greyPieces = document.querySelectorAll(".grey");

const boardLen = 8;

let greyCount = 12;
let brownCount = 12;
let turn = false;
let attack = false;
let record = "";
let gameMode = true;

let kings = new Map();

// parses pieceId's and returns the index of that piece's place on the board
let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    isKingNow: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false,
}

function clearBoard() {
    record = "";
    textArea.value = '';
    kings.clear();
    completeButton.disabled = true;
    cancelButton.disabled = true;
    removeCellonclick();
    for (var i = board.length - 1; i >= 0; i--) {
        if (board[i] !== null) {
            document.getElementById(board[i]).remove();
        }
        board[i] = null;
    }
}

function example_one() {
    clearBoard()
    var index = 1;
    var counter = 0;
    // БЕЛЫЕ
    board[5 + 8 * 4] = 12;
    cells[5 + 8 * 4].innerHTML = `<div class="brown" id="${12}"></div>`;
    board[7 + 8 * 4] = 13;
    cells[7 + 8 * 4].innerHTML = `<div class="brown" id="${13}"></div>`;

    /*board[4 + 8 * 5] = 14;
    cells[4 + 8 * 5].innerHTML = `<div class="brown" id="${14}"></div>`;
    board[3 + 8 * 4] = 15;
    cells[3 + 8 * 4].innerHTML = `<div class="brown" id="${15}"></div>`;*/

    // ЧЕРНЫЙ
    board[1] = 0;
    cells[1].innerHTML = `<div class="grey" id="${0}"></div>`;
    board[2 + 8 * 7] = 1;
    cells[2 + 8 * 7].innerHTML = `<div class="grey king" id="${1}"></div>`;
    kings.set(1, true)
    board[2 + 8 * 3] = 2;
    cells[2 + 8 * 3].innerHTML = `<div class="grey" id="${2}"></div>`;
    board[2 + 8 * 1] = 3;
    cells[2 + 8 * 1].innerHTML = `<div class="grey" id="${3}"></div>`;
    board[4 + 8 * 1] = 4;
    cells[4 + 8 * 1].innerHTML = `<div class="grey" id="${4}"></div>`;
    board[7 + 8 * 2] = 5;
    cells[7 + 8 * 2].innerHTML = `<div class="grey" id="${5}"></div>`;



    brownPieces = document.querySelectorAll(".brown");
    greyPieces = document.querySelectorAll(".grey");
    greyCount = greyPieces.length;
    brownCount = brownPieces.length;
    turn = false;
    attack = false;
    givePiecesEventListeners();
}

function begin() {
    clearBoard()
    var index = 1;
    var counter = 0;
    for (var i = 0; i < 12; i++) {
        if (Math.floor(index/8) != 0) {
            if (index == 8) {
                index = 1
            }
            else {
                index = 0
            }
            counter++;
        }
        board[index + 8 * counter] = i;
        cells[index + 8 * counter].innerHTML = `<div class="grey" id="${i}"></div>`;

        board[63 - index - 8 * counter] = 12 + i;
        cells[63 - index - 8 * counter].innerHTML = `<div class="brown" id="${12 + i}"></div>`;
        index = index + 2
    }
    brownPieces = document.querySelectorAll(".brown");
    greyPieces = document.querySelectorAll(".grey");
    greyCount = 12;
    brownCount = 12;
    turn = false;
    attack = false;
    givePiecesEventListeners();
}

function drawPieces() {
    for (i in board) {
        cells[i].innerHTML = ''
        if (board[i] !== null) {
            cells[i].innerHTML = `<div class="${getColor(board[i])}${isKing(board[i])}" id="${board[i]}"></div>`;
        }
    }
}

function getPositionForRecord(index) {
    var helper = ""
    switch (index % 8)
    {
        case 0:
            helper += "a"
            break;
        case 1:
            helper += "b"
            break;
        case 2:
            helper += "c"
            break;
        case 3:
            helper += "d"
            break;
        case 4:
            helper += "e"
            break;
        case 5:
            helper += "f"
            break;
        case 6:
            helper += "g"
            break;
        case 7:
            helper += "h"
            break;
    }
    helper += 8 - Math.floor(index/8)
    return helper
}

function cancelMove() {
    returnBoard()
    completeButton.disabled = true;
    cancelButton.disabled = true;
    givePiecesEventListeners();
}

function compliteMove() {
    changePlayer()
    completeButton.disabled = true;
    cancelButton.disabled = true;
}

function getColor(id) {
    if (id >= 12) return "brown";
    else return "grey";
}

function isKing(id) {
    if (kings.get(id)) return " king";
    else return "";
}

function inBoard(id) {
    for (var i = 0; i < board.length; i++) {
        if (board[i] === id) {
            board[i] = null;
            return true;
        }
    }
    return false;
}

function returnBoard() {
    record = "";
    if (selectedPiece.isKingNow) {
        kings.delete(selectedPiece.pieceId)
    }
    for (var i = 0; i < board.length; i++) {
        if (board[i] !== boardHelper[i] && boardHelper[i] !== null) {
            if (inBoard(boardHelper[i])) {
                document.getElementById(boardHelper[i]).remove();
            }
            board[i] = boardHelper[i]
            cells[i].innerHTML = `<div class="${getColor(board[i])}${isKing(board[i])}" id="${board[i]}"></div>`;
        }
        else if (board[i] !== boardHelper[i]) {
            document.getElementById(board[i]).remove();
            board[i] = null;
        }
    }
}

function saveBoard() {
    for (var i = 0; i < board.length; i++) {
        boardHelper[i] = board[i];
    }
}

function main() {
    getPlayerPieces()
    removeCellonclick();
    resetBorders();
    removeEventListeners();
    getSelectedPiece();
    actions();
}

function actions() {
    var cellsArr;
    if (selectedPiece.isKing) {
        if (attack)  {
            cellsArr = getAvailableSpacesAttacker();
            if (cellsArr.length > 0) {
                document.getElementById(selectedPiece.pieceId).style.border = "3px solid yellow";
                for (i in cellsArr)
                    giveCellClick(cellsArr[i].index, "red", cellsArr[i].vector)
            }
        }
        else {
            cellsArr = getAvailableSpacesMover();
            if (cellsArr.length > 0) {
                document.getElementById(selectedPiece.pieceId).style.border = "3px solid yellow";
                for (i in cellsArr)
                    giveCellClick(cellsArr[i], "green")
            }
        }
    }
    else {
        getAvailableSpaces();
        checkAvailableJumpSpaces();
        checkPieceConditions();
        givePieceBorder();
    }
}

// resets selected piece properties
function resetSelectedPieceProperties() {
    if (selectedPiece.pieceId !== -1 && gameMode) {
        document.getElementById(selectedPiece.pieceId).removeEventListener("click", resetTips);
    }
    selectedPiece.pieceId = -1;
    selectedPiece.indexOfBoardPiece = -1;
    selectedPiece.isKing = false;
    selectedPiece.isKingNow = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}

// resets selected piece properties
function resetSelectedPieceSpaces(newIndex) {
    if (selectedPiece.pieceId !== -1 && gameMode) {
        document.getElementById(selectedPiece.pieceId).removeEventListener("click", resetTips);
    }
    selectedPiece.indexOfBoardPiece = newIndex;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}

function GetElementInsideContainer(containerID, childID) {
    var elm = document.getElementById(childID);
    var parent = elm ? elm.parentNode : {};
    return (parent.id && parent.id === containerID) ? false : true;
}

function getAvailableSpacesMover(index = null) {
    var rad = 0;
    if (index === null)
        index = selectedPiece.indexOfBoardPiece
    var lt = true, lb = true, rt = true, rb = true;
    var attackers = [];
    for (var i = 0, bb = true; i < 7 && bb; i++, rad++) {
        // right top
        var idx = index - 7 + rad - 8 * rad;
        rt = rt && board[idx] === null && !isWhiteCell(idx);
        if (rt) {
            attackers.push(idx);
        }
        // left top
        idx = index - 9 - rad - 8 * rad;
        lt = lt && board[idx] === null && !isWhiteCell(idx);
        if (lt) {
            attackers.push(idx);
        }
        // left bottom
        idx = index + 7 - rad + 8 * rad;
        lb = lb && board[idx] === null && !isWhiteCell(idx);
        if (lb) {
            attackers.push(idx);
        }
        // right bottom
        idx = index + 9 + rad + 8 * rad;
        rb = rb && board[idx] === null && !isWhiteCell(idx);
        if (rb) {
            attackers.push(idx);
        }

        bb = lt || lb || rb || rt;

    }
    return attackers;
}

function getAvailableSpacesAttacker(index = null) {
    var rad = 0;
    var attackers = [];
    if (index === null)
        index = selectedPiece.indexOfBoardPiece
    var lb = true,lt = true, rb = true,rt = true;
    for (var i = 0; i  < 7; i++, rad++) {
        // right top
        var idx = index - 7 + rad - 8 * rad;
        var newIdx = index - 7 + rad + 1 - 8 * (rad + 1);
        if (rt && idx > 0
        && board[idx] !== null
        && board[newIdx] === null
        && !isWhiteCell(newIdx)
        && isEnemy(board[idx])) {

            attackers.push({
                index: newIdx,
                vector: "rt"
            })

            for (var j = i + 1, b = true; j < 7 && b; j++) {
                idx = index - 7 + rad + j - i + 1 - 8 * (rad + j - i + 1)
                if (board[idx] === null && !isWhiteCell(idx)) {
                    attackers.push({
                        index: idx,
                        vector: "rt"
                    })
                }
                else {
                    b = false
                }
            }
        }
        rt &= board[idx] === null
        // left top
        idx = index - 9 - rad - 8 * rad;
        newIdx = index - 9 - rad - 1 - 8 * (rad + 1);
        if (lt && idx > 0
        && board[idx] !== null
        && board[newIdx] === null
        && !isWhiteCell(newIdx)
        && isEnemy(board[idx])) {

            attackers.push({
                index: newIdx,
                vector: "lt"
            })

            for (var j = i + 1, b = true; j < 7 && b; j++) {
                idx = index - 9 - rad - (j - i + 1) - 8 * (rad + j - i + 1)
                if (board[idx] === null && !isWhiteCell(idx)) {
                    attackers.push({
                        index: idx,
                        vector: "lt"
                    })
                }
                else {
                    b = false
                }
            }
        }
        lt &= board[idx] === null
        // left bottom
        idx = index + 7 - rad + 8 * rad;
        newIdx = index + 7 - rad - 1 + 8 * (rad + 1);
        if (lb && idx > 0
        && board[idx] !== null
        && board[newIdx] === null
        && !isWhiteCell(newIdx)
        && isEnemy(board[idx])) {

            attackers.push({
                index: newIdx,
                vector: "lb"
            })

            for (var j = i + 1, b = true; j < 7 && b; j++) {
                idx = index + 7 - rad - (j - i + 1) + 8 * (rad + j - i + 1)
                if (board[idx] === null && !isWhiteCell(idx)) {
                    attackers.push({
                        index: idx,
                        vector: "lb"
                    })
                }
                else {
                    b = false
                }
            }
        }
        lb &= board[idx] === null
        // right bottom
        idx = index + 9 + rad + 8 * rad;
        newIdx = index + 9 + rad + 1 + 8 * (rad + 1);
        if (rb && idx > 0
        && board[idx] !== null
        && board[newIdx] === null
        && !isWhiteCell(newIdx)
        && isEnemy(board[idx])) {

            attackers.push({
                index: newIdx,
                vector: "rb"
            })

            for (var j = i + 1, b = true; j < 7 && b; j++) {
                idx = index + 9 + rad + (j - i + 1) + 8 * (rad + j - i + 1)
                if (board[idx] === null && !isWhiteCell(idx)) {
                    attackers.push({
                        index: idx,
                        vector: "rb"
                    })
                }
                else {
                    b = false
                }
            }
        }
        rb &= board[idx] === null
    }
    return attackers;
}

function isWhiteCell(index) {
    return (Math.floor(index / 8) % 2 === 0 && index % 8 % 2 === 0)
        || (Math.floor(index / 8) % 2 === 1 && index % 8 % 2 === 1)
}

function getAvailableSpaces() {
    if (board[selectedPiece.indexOfBoardPiece + 7] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece + 7)) {
        selectedPiece.seventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece + 9)) {
        selectedPiece.ninthSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 7] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece - 7)) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 9] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece - 9)) {
        selectedPiece.minusNinthSpace = true;
    }
}

// holds the length of the players piece count
function getPlayerPieces() {
    if (turn) {
        playerPieces = greyPieces;
    } else {
        playerPieces = brownPieces;
    }
}

// removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
    for (var i = blackCells.length - 1; i >= 0; i--) {
        blackCells[i].style.background = "#8B0000"
    }
}

// resets borders to default
function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
}

function resetTips() {
    removeCellonclick();
    resetBorders();
    givePiecesEventListeners();
}

// gets ID and index of the board cell its on
function getSelectedPiece(id = null) {
    if (id === null)
        selectedPiece.pieceId = parseInt(event.target.id);
    else
        selectedPiece.pieceId = id;
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    selectedPiece.isKing = kings.get(selectedPiece.pieceId);
    record = getPositionForRecord(selectedPiece.indexOfBoardPiece);

    if (gameMode) {
        if (!turn)
            event.target.addEventListener("click", resetTips);
        else
            event.target.addEventListener("click", resetTips);
    }
    console.log("id: ", event.target.id)
    console.log(event.target)
}

// gets the moves that the selected piece can jump
function checkAvailableJumpSpaces() {
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece + 14)
        && (board[selectedPiece.indexOfBoardPiece + 7] >= 12)) {
            selectedPiece.fourteenthSpace = true;
            attack = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece + 18)
        && (board[selectedPiece.indexOfBoardPiece + 9] >= 12)) {
            selectedPiece.eighteenthSpace = true;
            attack = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece - 14)
        && (board[selectedPiece.indexOfBoardPiece - 7] >= 12)) {
            selectedPiece.minusFourteenthSpace = true;
            attack = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece - 18)
        && (board[selectedPiece.indexOfBoardPiece - 9] >= 12)) {
            selectedPiece.minusEighteenthSpace = true;
            attack = true;
        }
    } else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece + 14)
        && (board[selectedPiece.indexOfBoardPiece + 7] < 12)
         && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
            selectedPiece.fourteenthSpace = true;
            attack = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece + 18)
        && (board[selectedPiece.indexOfBoardPiece + 9] < 12)
         && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
            selectedPiece.eighteenthSpace = true;
            attack = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece - 14)
        && (board[selectedPiece.indexOfBoardPiece - 7] < 12)
        && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
            selectedPiece.minusFourteenthSpace = true;
            attack = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null
        && !isWhiteCell(selectedPiece.indexOfBoardPiece - 18)
        && (board[selectedPiece.indexOfBoardPiece - 9] < 12)
        && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
            selectedPiece.minusEighteenthSpace = true;
            attack = true;
        }
    }
}

// restricts movement if the piece is a king
function checkPieceConditions() {
    if(attack) {return;}
    if (turn) {
        selectedPiece.minusSeventhSpace = false;
        selectedPiece.minusNinthSpace = false;
        selectedPiece.minusFourteenthSpace = false;
        selectedPiece.minusEighteenthSpace = false;
    } else {
        selectedPiece.seventhSpace = false;
        selectedPiece.ninthSpace = false;
        selectedPiece.fourteenthSpace = false;
        selectedPiece.eighteenthSpace = false;
    }

}

// gives the piece a green highlight for the user (showing its movable)
function givePieceBorder() {
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace
    || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid yellow";
        giveCellsClick();
    } else {
        return;
    }
}

function giveCellClick(position, color, orient = null) {
    cells[position].setAttribute("onclick", `makeMoves(${position},"${orient}")`);
    cells[position].style.background = color;
}

// gives the cells on the board a 'click' bassed on the possible moves
function giveCellsClick() {
    let index = selectedPiece.indexOfBoardPiece
    if (!attack) {
        if (selectedPiece.seventhSpace) {
            giveCellClick(index + 7, "green")
            //cells[selectedPiece.indexOfBoardPiece + 7].innerHTML = `<p>7</p>`;
        }
        if (selectedPiece.ninthSpace) {
            giveCellClick(index + 9, "green")
            //cells[selectedPiece.indexOfBoardPiece + 9].innerHTML = `<p>9</p>`;
        }
        if (selectedPiece.minusSeventhSpace) {
            giveCellClick(index - 7, "green")
            //cells[selectedPiece.indexOfBoardPiece - 7].innerHTML = `<p>-7</p>`;
        }
        if (selectedPiece.minusNinthSpace) {
            giveCellClick(index - 9, "green")
            //cells[selectedPiece.indexOfBoardPiece - 9].innerHTML = `<p>-9</p>`;
        }
    }
    else {
        if (selectedPiece.fourteenthSpace) {
            giveCellClick(index + 14, "red", "lb")
            //cells[selectedPiece.indexOfBoardPiece + 14].innerHTML = `<p>14</p>`;
        }
        if (selectedPiece.eighteenthSpace) {
            giveCellClick(index + 18, "red", "rb")
            //cells[selectedPiece.indexOfBoardPiece + 18].innerHTML = `<p>18</p>`;
        }
        if (selectedPiece.minusFourteenthSpace) {
            giveCellClick(index -14, "red", "rt")
            //cells[selectedPiece.indexOfBoardPiece - 14].innerHTML = `<p>-14</p>`;
        }
        if (selectedPiece.minusEighteenthSpace) {
            giveCellClick(index -18, "red", "lt")
            //cells[selectedPiece.indexOfBoardPiece - 18].innerHTML = `<p>-18</p>`;
        }
    }
}

// makes the move that was clicked
function makeMoves(position, orient) {
    if (turn) {
        greyPieces = document.querySelectorAll(".grey");
    } else {
        brownPieces = document.querySelectorAll(".brown");
    }
    var res = makeMove(position, orient)
    if (!attack)
        record += "-" + getPositionForRecord(position)
    else
        record += ":" + getPositionForRecord(position)
    console.log("res", res)
    drawPieces()
}

function makeMove(position, orient) {
    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (attack) {
        return changeData(indexOfPiece, position, orient);
    } else {
        return changeData(indexOfPiece, position);
    }
}

function findRemovePiece(orient, oldPos, newPos) {
    var or = 0;
    switch (orient)
    {
        case "lt":
            or = -9;
            break;
        case "lb":
            or = 7;
            break;
        case "rt":
            or = -7;
            break;
        case "rb":
            or = 9;
            break;
    }

    for (var i = oldPos + or; i != newPos; i += or) {
        if (board[i] !== null)
            return i;
    }
}

function setKingIf(modifiedIndex) {
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 56) {
        selectedPiece.isKing = true
        selectedPiece.isKingNow = true
        kings.set(selectedPiece.pieceId, true)
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        selectedPiece.isKing = true
        selectedPiece.isKingNow = true
        kings.set(selectedPiece.pieceId, true)
    }
}

// Changes the board states data on the back end
function changeData(indexOfBoardPiece, modifiedIndex, orient) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);
    setKingIf(modifiedIndex)
    if (orient) {

        var removePiece = findRemovePiece(orient, indexOfBoardPiece, modifiedIndex)

        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            brownCount--
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            greyCount--
        }
    }
    removeCellonclick();
    removeEventListeners();

    console.log(attack && checkAttackerPiece(modifiedIndex).length > 0)
    if(attack && checkAttackerPiece(modifiedIndex).length > 0) {
        resetSelectedPieceSpaces(modifiedIndex)
        actions()
        return false;
    }
    else {
        checkForWin();
        return true;
    }
}

// removes the 'onClick' event listeners for pieces
function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < greyPieces.length; i++) {
            greyPieces[i].removeEventListener("click", main);
        }
    } else {
        for (let i = 0; i < brownPieces.length; i++) {
            brownPieces[i].removeEventListener("click", main);
        }
    }
}

// Checks for a win
function checkForWin() {
    console.log(brownCount, greyCount)
    if (brownCount === 0) {
        alert("grey wins!")
        textArea.value += "\n GREY WINS"
    } else if (greyCount === 0) {
        alert("orange wins!")
        textArea.value += "\n BROWN WINS"
    }
    else {
        completeButton.disabled = false;
        cancelButton.disabled = false;
    }
}

// Switches players turn #Complete move
function changePlayer() {
    resetSelectedPieceProperties();
    if (textArea.value.length !== 0)
        if (!turn)
            textArea.value += "\n"
        else
            textArea.value += " "
    textArea.value += record
    turn = !turn;
    givePiecesEventListeners();
}

function isAttackPiece(index) {
    var attackers = []
    if (turn) {
        if (board[index + 14] === null
        && !isWhiteCell(index + 14)
        && (board[index + 7] >= 12)) {
            attackers.push(index + 14)
        }
        if (board[index + 18] === null
        && !isWhiteCell(index + 18)
        && (board[index + 9] >= 12)) {
            attackers.push(index + 18)
        }
        if (board[index - 14] === null
        && !isWhiteCell(index - 14)
        && (board[index - 7] >= 12)) {
            attackers.push(index - 14)
        }
        if (board[index - 18] === null
        && !isWhiteCell(index - 18)
        && (board[index - 9] >= 12)) {
            attackers.push(index - 18)
        }
    } else {
        if (board[index + 14] === null
        && !isWhiteCell(index + 14)
        && (board[index + 7] < 12) && board[index + 7] !== null) {
            attackers.push(index + 14)
        }
        if (board[index + 18] === null
        && !isWhiteCell(index + 18)
        && (board[index + 9] < 12) && board[index + 9] !== null) {
            attackers.push(index + 18)
        }
        if (board[index - 14] === null
        && !isWhiteCell(index - 14)
        && (board[index - 7] < 12) && board[index - 7] !== null) {
            attackers.push(index - 14)
        }
        if (board[index - 18] === null
        && !isWhiteCell(index - 18)
        && (board[index - 9] < 12) && board[index - 9] !== null) {
            attackers.push(index - 18)
        }
    }
    return attackers;
}

function isEnemy(targetId) {
    if (turn) {
        return targetId >= 12;
    }
    else return targetId < 12;
}

function isAttackKing(index) {
    var rad = 0;
    var attackers = []
    var lb = true,lt = true, rb = true,rt = true;
    for (var i = 0; i  < 7; i++, rad++) {
        // right top
        var idx = index - 7 + rad - 8 * rad;
        var newIdx = index - 7 + rad + 1 - 8 * (rad + 1);
        if (rt && idx > 0
        && board[idx] !== null
        && board[newIdx] === null
        && !isWhiteCell(newIdx)
        && isEnemy(board[idx])) {

            attackers.push(newIdx)

            for (var j = i + 1, b = true; j < 7 && b; j++) {
                idx = index - 7 + rad + j - i + 1 - 8 * (rad + j - i + 1)
                if (board[idx] === null && !isWhiteCell(idx)) {
                    attackers.push(idx)
                }
                else {
                    b = false
                }
            }
        }
        rt &= board[idx] === null
        // left top
        idx = index - 9 - rad - 8 * rad;
        newIdx = index - 9 - rad - 1 - 8 * (rad + 1);
        if (lt && idx > 0
        && board[idx] !== null
        && board[newIdx] === null
        && !isWhiteCell(newIdx)
        && isEnemy(board[idx])) {

            attackers.push(newIdx)

            for (var j = i + 1, b = true; j < 7 && b; j++) {
                idx = index - 9 - rad - (j - i + 1) - 8 * (rad + j - i + 1)
                if (board[idx] === null && !isWhiteCell(idx)) {
                    attackers.push(idx)
                }
                else {
                    b = false
                }
            }
        }
        lt &= board[idx] === null
        // left bottom
        idx = index + 7 - rad + 8 * rad;
        newIdx = index + 7 - rad - 1 + 8 * (rad + 1);
        if (lb && idx > 0
        && board[idx] !== null
        && board[newIdx] === null
        && !isWhiteCell(newIdx)
        && isEnemy(board[idx])) {

            attackers.push(newIdx)

            for (var j = i + 1, b = true; j < 7 && b; j++) {
                idx = index + 7 - rad - (j - i + 1) + 8 * (rad + j - i + 1)
                if (board[idx] === null && !isWhiteCell(idx)) {
                    attackers.push(idx)
                }
                else {
                    b = false
                }
            }
        }
        lb &= board[idx] === null
        // right bottom
        idx = index + 9 + rad + 8 * rad;
        newIdx = index + 9 + rad + 1 + 8 * (rad + 1);
        if (rb && idx > 0
        && board[idx] !== null
        && board[newIdx] === null
        && !isWhiteCell(newIdx)
        && isEnemy(board[idx])) {

            attackers.push(newIdx)

            for (var j = i + 1, b = true; j < 7 && b; j++) {
                idx = index + 9 + rad + (j - i + 1) + 8 * (rad + j - i + 1)
                if (board[idx] === null && !isWhiteCell(idx)) {
                    attackers.push(idx)
                }
                else {
                    b = false
                }
            }
        }
        rb &= board[idx] === null
    }
    return attackers;
}

function checkAttackerPiece(index) {
    if (kings.get(board[index])) {
        return isAttackKing(index);
    }
    else {
        return isAttackPiece(index);
    }
}

function getAvailablePieces() {
    var piecesCells = [];
    if (!turn) {
        var bufArray = [];
        for (var i = 11; i >= 0; i--) {
            var k = findPiece(i + 12)
            var arr = checkAttackerPiece(k);
            if (k >= 0 && arr.length > 0) {
                piecesCells.concat(arr)
                attack = true;
                bufArray.push(i + 12);
            }
        }
        if (attack) {
            brownPieces = [];
            for(var i = 0; i < bufArray.length; i++) {
                brownPieces.push(document.getElementById(bufArray[i]));
            }
        }
    }
    else {
        var bufArray = [];
        for (var i = 11; i >= 0; i--) {
            var k = findPiece(i)
            var arr = checkAttackerPiece(k);
            if (k >= 0 && arr.length > 0) {
                piecesCells.concat(arr)
                attack = true;
                bufArray.push(i);
            }
        }
        if (attack) {
            greyPieces = [];
            for(var i = 0; i < bufArray.length; i++) {
                greyPieces.push(document.getElementById(bufArray[i]));
            }
        }
    }
    return piecesCells
}

// Show game after text records

function getIndexBySymbols(sym) {
    if (sym.length !== 2)
        return -1;
    var index = (8 - parseInt(sym[1])) * 8;
    switch (sym[0]) {
        case 'A': case 'a':
            index += 0;break;
        case 'B': case 'b':
            index += 1; break;
        case 'C': case 'c':
            index += 2; break;
        case 'D': case 'd':
            index += 3; break;
        case 'E': case 'e':
            index += 4; break;
        case 'F': case 'f':
            index += 5; break;
        case 'G': case 'g':
            index += 6; break;
        case 'h': case 'h':
            index += 7; break;
        default:
            index = NaN;
    }
    console.log("index",index)
    return index;
}

function selectTextareaLine(lineNum) {
    tarea = textArea;
    var lines = tarea.value.split("\n");
    console.log(lines[lineNum], lineNum)
    // calculate start/end
    var startPos = 0, endPos = tarea.value.length;
    for(var x = 0; x < lines.length; x++) {
        if(x == lineNum) {
            break;
        }
        startPos += (lines[x].length+1);

    }

    var endPos = lines[lineNum].length+startPos;

    // do selection
    // Chrome / Firefox

    if(typeof(tarea.selectionStart) != "undefined") {
        tarea.focus();
        tarea.selectionStart = startPos;
        tarea.selectionEnd = endPos;
        return true;
    }

    // IE
    if (document.selection && document.selection.createRange) {
        tarea.focus();
        tarea.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", endPos);
        range.moveStart("character", startPos);
        range.select();
        return true;
    }

    return false;
}

function showKingAttack(pos, move, moves) {
    var index = getIndexBySymbols(pos);
    var newIndex = getIndexBySymbols(move);
    var arr = getAvailableSpacesAttacker(index)
    var elem = null;
    for (i in arr) {
        if (arr[i].index === newIndex) {
            elem = arr[i]
        }
    }
    if (elem === null || board[newIndex] != null) { // ошибка
        console.log("ноль где то у дамки", index, newIndex, elem, moves)
        selectTextareaLine(moves);
        return false;
    }
    var removePiece = findRemovePiece(elem.vector, index, newIndex);
    if (removePiece === index) { // ошибка
        console.log("атака дамка")
        selectTextareaLine(moves);
        return false;
    }
    board[removePiece] = null;
    board[newIndex] = board[index]
    board[index] = null;
    return true;
}

function showPieceAttack(pos, move, moves) {
    console.log("заходит обычная")
    var index = getIndexBySymbols(pos)
    var newIndex = getIndexBySymbols(move);
    getSelectedPiece(board[index]);
    checkAvailableJumpSpaces()
    var res = (newIndex - index === -14 && selectedPiece.minusFourteenthSpace)
        || (newIndex - index === -18 && selectedPiece.minusEighteenthSpace)
        || (newIndex - index === 18 && selectedPiece.eighteenthSpace)
        || (newIndex - index === 14 && selectedPiece.fourteenthSpace);
    if (!res) { // ошибка
        console.log("атака обычная", index, newIndex)
        selectTextareaLine(moves);
        return false;
    }
    board[newIndex] = board[index]
    board[(newIndex + index) / 2] = null
    board[index] = null;
    setKingIf(newIndex)
    return true;
}

function isCorrectMove(move) {
    var regMove = /[A-Ha-h][1-8](:[A-Ha-h][1-8])+/.test(move)
    var regAttack = /[A-Ha-h][1-8]-[A-Ha-h][1-8]/.test(move)
    return regMove && !regAttack || !regMove && regAttack
}


function showTextGame() {
    gameMode = false;
    var result = true;
    var newMap = new Map(kings)
    var text = textarea.value.split("\n")
    console.log("text", text)
    for (var k = 0; k < text.length && result; k++) {
        if (text[k].length >= 5) {
            var moves = text[k].split(" ")
            for (i in moves) {
                if (!isCorrectMove(moves[i])) {
                    console.log("проблема с синтаксисом")
                    selectTextareaLine(k);
                    result = false;
                    break;
                }
                if (moves[i].match(/-/)) { // просто ход
                    var movesArray = moves[i].replace(/\s/g, "").split("-");
                    if (movesArray.length > 2) {
                        console.log("проблема с количеством")
                        selectTextareaLine(k);
                        result = false;
                        break;
                    }
                    var index = getIndexBySymbols(movesArray[0])
                    var newIndex = getIndexBySymbols(movesArray[1])
                    if (board[index] === null || board[newIndex] !== null) { // ошибка
                        console.log("не ноль на переходе")
                        selectTextareaLine(k);
                        result = false;
                        break;
                    }
                    var arr
                    if (kings.get(board[index])) { // дамка
                        arr = getAvailableSpacesMover(index);
                        if (arr.indexOf(newIndex) < 0 || board[newIndex] !== null) { // ошибка
                            console.log("ход дамка")
                            selectTextareaLine(k);
                            result = false;
                            break;
                        }
                    }
                    else { // обычная шашка
                        getSelectedPiece(board[index]);
                        getAvailableSpaces()
                        checkPieceConditions()
                        var res = (newIndex - index === -7 && selectedPiece.minusSeventhSpace)
                            || (newIndex - index === -9 && selectedPiece.minusNinthSpace)
                            || (newIndex - index === 9 && selectedPiece.ninthSpace)
                            || (newIndex - index === 7 && selectedPiece.seventhSpace);
                        if (!res) { // ошибка
                            console.log("ход обычной")
                            selectTextareaLine(k);
                            result = false;
                            break;
                        }
                        setKingIf(newIndex)
                    }
                    board[newIndex] = board[index]
                    board[index] = null;


                }
                else { // атака
                    var movesArray = moves[i].split(":");
                    for (var i = 1; i < movesArray.length; i++) {
                        var index = getIndexBySymbols(movesArray[i-1])
                        console.log(board)
                        console.log(kings.get(board[index]), board[index], index, !undefined)
                        if (kings.get(board[index])) {// дамка
                            if (!showKingAttack(movesArray[i-1], movesArray[i], k)) {
                                console.log("шашка дамка атак", k)
                                result = false;
                            }
                        }
                        else { // обычная шашка
                            if (!showPieceAttack(movesArray[i-1], movesArray[i], k)) {
                                console.log("шашка обычная атак", k)
                                result = false;
                            }
                        }
                    }
                }
                turn = !turn;
            }
        }
        else {
            console.log("конец или недописанное что то")
            result = false;
            selectTextareaLine(k);
        }
    }
    if (!result) {
        returnBoard();
        kings = newMap;
    }
    gameMode = true;
    brownPieces = document.querySelectorAll(".brown");
    greyPieces = document.querySelectorAll(".grey");
    greyCount = greyPieces.length;
    brownCount = brownPieces.length;
    attack = false;
    givePiecesEventListeners()
}



function givePiecesEventListeners() {
    drawPieces();
    saveBoard();
    greyPieces = document.querySelectorAll(".grey");
    brownPieces = document.querySelectorAll(".brown");
    greyCount = greyPieces.length;
    brownCount = brownPieces.length;
    attack = false;
    console.log(board)
    var pCells = getAvailablePieces()
    if (pCells.length > 0) {
        // Если надо будет красить
    }
    if (!turn) {
        for (var i = brownPieces.length - 1; i >= 0; i--) {
            brownPieces[i].addEventListener("click", main)
        }
    }
    else {
        for (var i = greyPieces.length - 1; i >= 0; i--) {
            greyPieces[i].addEventListener("click", main )
        }
    }
}
