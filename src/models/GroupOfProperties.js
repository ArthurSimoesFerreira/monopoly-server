export class GroupOfProperties {
    constructor(color) {
        this.color = "";
        this.quantity = 0;
        this.residentials = []
    }

    quantity_same_owner(player) {
        // Lógica para retornar quantidade de residencias no grupo possum player como dono
    }

    addResidentials(residentials) {
        residentials.forEach(residential => {
            this.residentials.push(residential)
            this.quantity += 1;
        });
    }
}