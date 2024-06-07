// src/models/Board.js
export class Board {
    constructor() {
        this.house_quantity = 0;
        this.positions = [];
        this.current_house = null;
    }

    initialize_board() { }

    move_piece(player, moveSpaces) { }

    transfer_piece(player, finalPosition) { }

    same_owner_count(player, property) { }
}