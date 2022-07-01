class Tile{
    constructor(context, color){
        this._context = context;
        this._color = color;
        this._piece = null;
    }

    setPiece(piece){
        this._piece = piece
    }

    clearPiece(){
        this._piece = null;
    }

    draw(x, y, s){
        this._context.fillStyle = this._color;
        this._context.fillRect(x, y, s, s);

        if (this._piece){

        }
    }
}