export class GroupOfProperties {
    constructor() {
        this.type = "";
        this.quantity = 0;
        this.residentials = [] // [{residential: Residential, rent_value: int}]
    }

    quantity_same_owner(player) {
        // Lógica para retornar quantidade de residencias no grupo possum player como dono
    }

    addResidential(residential) {
        this.residentials.push([residential, residential.rentValue()])
        this.quantity += 1;
    }
}