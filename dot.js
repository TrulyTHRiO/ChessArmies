const server = new WebSocket("wss://82.20.58.71:5072");

const alphabet = "abcdefghijklmnopqrstuvwxyz"
const boardColours = "wbwbwbwbbwbwbwbwwbwbwbwbbwbwbwbwwbwbwbwbbwbwbwbwwbwbwbwbbwbwbwbw"
const boardPieces = "rnbqkbnrpppppppp--------------------------------PPPPPPPPRNBQKBNR"
currentTurn = "w"
// const boardPieces = "RNBQKBNRPPPPPPPP--------------------------------pppppppprnbqkbnr"
const boardSize = Math.sqrt(boardColours.length)
boardArr = new Array(boardSize)
for (let i = 0; i < boardSize; i++) {
  boardArr[i] = new Array(boardSize)
}
selectedTile = null

console.log(boardArr)

class tile {

    constructor(tile, piece) {
        this.pos = tile
        this.piece = piece
    }

}

function CreateTiles(playerCol) {
    if (playerCol == "b") {
        document.getElementById("board").classList.add("rot")
    }
    for (let i1 = 0; i1 < boardSize; i1++) {
        for (let i2 = 0; i2 < boardSize; i2++) {
            let col = boardColours[i1*boardSize+i2]
            console.log(col)
            tile = document.createElement("div")
            tile.classList.add("tile")
            if (col == "b") {
                tile.classList.add("black")
            } else {
                tile.classList.add("white")
            }
            pos = alphabet[i2]+(boardSize-i1)
            tile.setAttribute("id", pos)
            boardArr[i2][boardSize-i1-1] = CreatePiece(boardPieces[i1*boardSize+i2], pos)
            // boardArr[i2][i1] = CreatePiece(boardPieces[i1*boardSize+i2], pos)
            document.getElementById("board").appendChild(tile)
            if (boardArr[i2][boardSize-i1-1] != null) {
                console.log((alphabet[i2]+(boardSize-i1-1)))
                console.log(alphabet.indexOf((alphabet[i2]+(i1+1))[0]),(alphabet[i2]+(i1+1))[1]-1)
                UpdateImage((alphabet[i2]+(boardSize-i1)))
            }
        }
    }
    document.getElementById("board").setAttribute("style", "grid-template-columns: repeat("+ boardSize + ", min-content)");
}

function CreatePiece(piece, tile) {
    let col
    if (piece == piece.toLowerCase()) {
        col = "b"
    } else {
        col = "w"
    }
    piece = piece.toLowerCase()
    if (piece == "r") {
        return new rook(tile, col)
    }
    if (piece == "n") {
        return new knight(tile, col)
    }
    if (piece == "b") {
        return new bishop(tile, col)
    }
    if (piece == "q") {
        return new queen(tile, col)
    }
    if (piece == "k") {
        return new king(tile, col)
    }
    if (piece == "p") {
        return new pawn(tile, col)
    }
    if (piece == "-") {
        return null
    }
}

function MovePiece(piece, tile) {
    console.log(Math.abs(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0])), "ban")
    document.getElementById(piece.pos).innerHTML = ""
    if ((piece instanceof king) ? (Math.abs(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0])) > 1) : false) {
        // console.log("nba")
        // if (Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0])) == 1) {
        //     boardArr[0][piece.pos[1]-1].turnMovable = false
        //     console.log("filerr")
        //     boardArr[0][piece.pos[1]-1].pos = "d"+String(piece.pos[1]) //alphabet[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0]))*-1]
        // } else {
        //     boardArr[7][piece.pos[1]-1].turnMovable = false
        //     boardArr[7][piece.pos[1]-1].pos = alphabet[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0]))*-1]+String(piece.pos[1])
        // }
        // boardArr[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0]))*-1][piece.pos[1]-1] = (Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0])) == 1 ? boardArr[0][piece.pos[1]-1] : boardArr[7][piece.pos[1]-1]);
        // if (Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0])) == 1) {
        //     boardArr[0][piece.pos[1]-1] = null
        // } else {
        //     boardArr[7][piece.pos[1]-1] = null
        // }
        // document.getElementById(Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0])) === 1 ? "a"+piece.pos[1] : "h"+piece.pos[1]).innerHTML = ""
        // console.log(boardArr[0][piece.pos[1]], "ahasasdasda")
        // console.log(alphabet[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0]))*-1]+String(piece.pos[1]))
        // UpdateImage(alphabet[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0]))*-1]+String(piece.pos[1]))
        // console.log(boardArr[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(tile[0])-alphabet.indexOf(piece.pos[0]))*2][piece.pos[1]-1])
        // boardArr[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(tile[0])-alphabet.indexOf(piece.pos[0]))*2][piece.pos[1]-1] = piece
        // console.log(alphabet[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(tile[0])-alphabet.indexOf(piece.pos[0]))*2]+String(piece.pos[1]))
        // UpdateImage(alphabet[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(tile[0])-alphabet.indexOf(piece.pos[0]))*2]+String(piece.pos[1]))
        // boardArr[alphabet.indexOf(piece.pos[0])][piece.pos[1]-1] = null
        // if (Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0])) == 1) {
        //     console.log(alphabet[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0]))*-2]+String(piece.pos[1]),"googa")
        //     boardArr[2][piece.pos[1]-1].pos = alphabet[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0]))*-2]+String(piece.pos[1])
        // } else {
        //     boardArr[6][piece.pos[1]-1].pos = alphabet[alphabet.indexOf(piece.pos[0])+Math.sign(alphabet.indexOf(piece.pos[0])-alphabet.indexOf(tile[0]))*-2]+String(piece.pos[1])
        // }
    } else {
    boardArr[alphabet.indexOf(tile[0])][tile[1]-1] = piece
    boardArr[alphabet.indexOf(piece.pos[0])][piece.pos[1]-1] = null
    piece.pos = tile
    UpdateImage(tile)
    }
    piece.turnMovable = false
    if (document.getElementById("board").classList.contains("rot")) {
        document.getElementById(piece.pos).classList.remove("rot")
    } else {
        document.getElementById(piece.pos).classList.add("rot")
    }
}

function UpdateImage(tile) {
    document.getElementById(tile).innerHTML = '<img class="piece" src="'+boardArr[alphabet.indexOf(tile[0])][tile[1]-1].img+'"></img>'
}

CreateTiles("w")

var divs = document.querySelectorAll(".tile")

for (let i = 0; i < divs.length; ++i) {
    divs[i].onclick = function() {
        if (selectedTile != null) {
            document.getElementById(selectedTile.pos).classList.remove("selected")
            if (selectedTile == boardArr[alphabet.indexOf(this.id[0])][this.id[1]-1]) {
                selectedTile = null
            } else if (selectedTile.ValidateMove(this.id)) {
                if (selectedTile.turnMovable) {
                    MovePiece(selectedTile, this.id)
                }
                console.log(this.id)
                selectedTile = null
            } else if (boardArr[alphabet.indexOf(this.id[0])][this.id[1]-1]) {
                console.log(boardArr[alphabet.indexOf(this.id[0])][this.id[1]-1])
                if ((boardArr[alphabet.indexOf(this.id[0])][this.id[1]-1]).colour == currentTurn) {
                    selectedTile = boardArr[alphabet.indexOf(this.id[0])][this.id[1]-1]
                    this.classList.add("selected")
                } else {
                    selectedTile = null
                }
            } else {
                selectedTile = null
            }
        } else if (boardArr[alphabet.indexOf(this.id[0])][this.id[1]-1]){
            console.log(boardArr[alphabet.indexOf(this.id[0])][this.id[1]-1])
            if ((boardArr[alphabet.indexOf(this.id[0])][this.id[1]-1]).colour == currentTurn) {
                selectedTile = boardArr[alphabet.indexOf(this.id[0])][this.id[1]-1]
                this.classList.add("selected")
            }
        }
  }
}

// document.getElementById("turnChange").onclick = function() {
//     if (document.getElementById("board").classList.contains("rot")) {
//         document.getElementById("board").classList.remove("rot")
//         for (let i = 0; i < divs.length; ++i) {
//             divs[i].classList.remove("rot")
//         }
//     } else {
//         document.getElementById("board").classList.add("rot")
//         for (let i = 0; i < divs.length; ++i) {
//             divs[i].classList.add("rot")
//         }
//     }
//     document.getElementById("turnChange").style = "visibility: hidden"; // display: none
//     (currentTurn == "w" ? currentTurn = "b" : currentTurn = "w")
//     for (i1 = 0; i1 < boardSize; i1++) {
//         for (i2 = 0; i2 < boardSize; i2++) {
//             if (boardArr[i1][i2]) {
//                 boardArr[i1][i2].turnMovable = true
//             }
//         }
//     }
// }