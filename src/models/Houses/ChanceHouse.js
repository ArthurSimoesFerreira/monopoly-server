export class ChanceHouse extends House {
    constructor(positionOnBoard, type) {
        super(positionOnBoard);
        this.type = type;
    }

    visit(player, bank) { }
}