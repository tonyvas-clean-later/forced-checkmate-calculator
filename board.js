const TILES = 8;
const RANKS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const FILES = [8, 7, 6, 5, 4, 3, 2, 1]

class Board{
    constructor(context, legendSize, boardSize){
        this._context = context;
        this._legendSize = legendSize;
        this._boardSize = boardSize;
        this._tileSize = this._boardSize / TILES;
        this._rotated = false;
        this._setupTiles();
    }

    _setupTiles(){
        let colors = ['white', 'black'];
        this._rows = [];

        for (let r = 0; r < TILES; r++){
            let tiles = [];
            for (let t = 0; t < TILES; t++){
                tiles.push(new Tile(this._context, colors[0]));
                this._cycleArray(colors);
            }
            this._rows.push(tiles);
            this._cycleArray(colors);
        }
    }
    
    _cycleArray(array){
        if (array.length > 0){
            let first = array.splice(0, 1)[0]
            array.push(first);
        }
    }

    _drawLegend(){
        this._context.font = `${this._legendSize / 2}px arial`;
        this._context.fillStyle = 'red'

        this._context.textAlign = 'start'
        this._context.textBaseline = 'alphabetic'
        for (let r = 0; r < RANKS.length; r++){
            let x = r * this._tileSize + this._legendSize / 2;
            let y = this._legendSize / 2;
            let rank;

            if (this._rotated){
                rank = RANKS[RANKS.length - r - 1]
            }
            else{
                rank = RANKS[r]
            }

            this._context.fillText(rank, x, y);
        }

        this._context.textAlign = 'end'
        this._context.textBaseline = 'top'
        for (let f = 0; f < FILES.length; f++){
            let x = this._legendSize / 2;
            let y = f * this._tileSize + this._legendSize / 2;
            let file;

            if (this._rotated){
                file = FILES[FILES.length - f - 1]
            }
            else{
                file = FILES[f]
            }

            this._context.fillText(file, x, y);
        }
    }

    _drawBoard(){
        if (this._rotated){
            for (let r = this._rows.length - 1; r >= 0; r--){
                let tiles = this._rows[r];
                for (let t = tiles.length - 1; t >= 0; t--){
                    let tile = tiles[t];
                    let x = t * this._tileSize + this._legendSize / 2;
                    let y = r * this._tileSize + this._legendSize / 2;
    
                    tile.draw(x, y, this._tileSize);
                }
            }
        }
        else{
            for (let r = 0; r < this._rows.length; r++){
                let tiles = this._rows[r];
                for (let t = 0; t < tiles.length; t++){
                    let tile = tiles[t];
                    let x = t * this._tileSize + this._legendSize / 2;
                    let y = r * this._tileSize + this._legendSize / 2;
    
                    tile.draw(x, y, this._tileSize);
                }
            }
        }
    }

    rotate(){
        this._rotated = !this._rotated;
        this.draw();
    }

    draw(){
        this._context.clearRect(0, 0, this._legendSize + this._boardSize, this._legendSize + this._boardSize);
        this._drawBoard();
        this._drawLegend();
    }
}