// src/server/controllers/GameController.js
import { Player } from '../models/Player.js';
import { Jail } from '../models/Houses/Jail.js';
import { Board } from '../models/Board.js';
import { Pawn } from '../models/Pawn.js';
import { GroupOfProperties } from '../models/GroupOfProperties.js';
import { Residential } from '../models/Houses/Properties/Residential.js';
import { Start } from '../models/Houses/Start.js';
import { TaxHouse } from '../models/Houses/TaxHouse.js';
import { ChanceHouse } from '../models/Houses/ChanceHouse.js';
import { GoToJail } from '../models/Houses/GoToJail.js';
import { Service } from '../models/Houses/Properties/Service.js';
import { Station } from '../models/Houses/Properties/Station.js';

export class GameController {

    static playerConnect(io, socket, game, playerName) {
        const newPlayer = new Player(socket.id, playerName);
        game.addPlayer(socket.id, playerName);
        game.board.positions.push({ pawn: newPlayer.pawn, position: 0 });
        io.emit('playerUpdate', game.players);
    }

    static playerDisconnect(io, socket, game) {
        game.removePlayer(socket.id);
        io.emit('playerUpdate', game.players);
    }

    static intializeBoard(io, game) {
        game.board = Board.get_instance();
        game.players.forEach(player => {
            pawn = new Pawn(player);
            game.board.positions.push({ pawn: pawn, position: 0 });
        });

        // Criar grupos de propriedades
        const redGroup = new GroupOfProperties("red");
        const greenGroup = new GroupOfProperties("green");
        const blueGroup = new GroupOfProperties("blue");
        const purpleGroup = new GroupOfProperties("purple");
        const brownGroup = new GroupOfProperties("brown");
        const yellowGroup = new GroupOfProperties("yellow");
        const orangeGroup = new GroupOfProperties("orange");
        const skyBlueGroup = new GroupOfProperties("skyBlue");

        // Criar propriedades
        let residentials = [];
        residentials.push(new Residential("Avenida Ary Parreiras", 200, 25));
        residentials.push(new Residential("Rua Presidente Backer", 200, 25));
        residentials.push(new Residential("Rua Miguel de Frias", 200, 25));
        redGroup.addResidentials(residentials);

        residentials = [];
        residentials.push(new Residential("Rua Paulo Alves", 200, 25));
        residentials.push(new Residential("Rua Gavião Peixoto", 200, 25));
        residentials.push(new Residential("Rua Mariz e Barros", 200, 25));
        greenGroup.addResidentials(residentials);

        residentials = [];
        residentials.push(new Residential("Rua Joaquim Távora", 200, 25));
        residentials.push(new Residential("Rua Doutor Celestino", 200, 25));
        blueGroup.addResidentials(residentials);

        residentials = [];
        residentials.push(new Residential("Rua Noronha Torrezão", 200, 25));
        residentials.push(new Residential("Rua Almirante Tamandaré", 200, 25));
        residentials.push(new Residential("Rua Desembargador Lima Castro", 200, 25));
        purpleGroup.addResidentials(residentials);

        residentials = [];
        residentials.push(new Residential("Rua Fagundes Varela", 200, 25));
        residentials.push(new Residential("Rua Marquês de Paraná", 200, 25));
        brownGroup.addResidentials(residentials);

        residentials = [];
        residentials.push(new Residential("Rua Álvares de Azevedo", 200, 25));
        residentials.push(new Residential("Rua São João", 200, 25));
        residentials.push(new Residential("Rua Professor Heitor Carrilho", 200, 25));
        yellowGroup.addResidentials(residentials);

        residentials = [];
        residentials.push(new Residential("Rua Doutor Nelson de Sá Earp", 200, 25));
        residentials.push(new Residential("Rua Cinco de Julho", 200, 25));
        residentials.push(new Residential("Rua Visconde do Rio Branco", 200, 25));
        orangeGroup.addResidentials(residentials);

        residentials = [];
        residentials.push(new Residential("Rua Mariz e Barros", 200, 25));
        residentials.push(new Residential("Rua Tavares de Macedo", 200, 25));
        residentials.push(new Residential("Rua Carlos Gomes", 200, 25));
        skyBlueGroup.addResidentials(residentials);


        let start = new Start(200);
        let taxN = new TaxHouse(300);
        let taxL = new TaxHouse(450);
        let sorte = new ChanceHouse();
        let sorte2 = Object.assign({}, sorte);
        let sorte3 = Object.assign({}, sorte);
        let prison = new GoToJail();
        let jail = new Jail();
        let service1 = new Service("Ampla", 150, 75);
        let service2 = new Service("Águas do Rio", 150, 75);
        let station1 = new Station("Metro", 250, 50);
        let station2 = new Station("VLT", 250, 50);
        let station3 = new Station("BRT", 250, 50);
        let station4 = new Station("Terminal", 250, 50);

        game.board.houses = [
            start,
            brownGroup.residentials[0],
            brownGroup.residentials[1],
            taxN,
            station1,
            skyBlueGroup.residentials[0],
            sorte,
            skyBlueGroup.residentials[1],
            skyBlueGroup.residentials[2],
            jail,
            purpleGroup.residentials[0],
            service1,
            purpleGroup.residentials[0],
            purpleGroup.residentials[1],
            station2,
            orangeGroup.residentials[0],
            orangeGroup.residentials[1],
            orangeGroup.residentials[2],
            null,//parking lot
            redGroup.residentials[0],
            sorte2,
            redGroup.residentials[1],
            redGroup.residentials[2],
            station3,
            yellowGroup.residentials[0],
            yellowGroup.residentials[1],
            service2,
            yellowGroup.residentials[2],
            prison,
            greenGroup.residentials[0],
            greenGroup.residentials[1],
            greenGroup.residentials[2],
            station4,
            sorte3,
            blueGroup.residentials[0],
            taxL,
            blueGroup.residentials[1],
        ];
        io.emit('boardInitialized', { houses: game.board.houses, positions: game.board.positions })
        console.log(game.board.houses);
    }

    static findPlayer(game, socket) {
        const player = game.players.find(player => player.id === socket.id);
        return player;
    }

    static rollDice(io, socket, game) {
        const player = this.findPlayer(game, socket)

        if (player) {
            const rollAndMove = () => {
                const diceValues = game.rollAllDice();
                const totalRoll = diceValues.reduce((a, b) => a + b, 0);

                if (diceValues[0] === diceValues[1]) {
                    player.double_counter += 1;

                    if (player.double_counter >= 3) {
                        player.double_counter = 0;
                        const jail = game.board.houses.find(house => house instanceof Jail);
                        const jailPosition = jail.boardPosition;

                        game.board.transferPawn(player, jailPosition);
                        jail.visit(player, game.bank, io);
                        io.emit('updatePositions', game.board.positions);
                        io.emit('diceResult', { playerId: socket.id, diceValues, totalRoll });
                        io.emit('playerArrested', { playerId: socket.id, message: `${player.name} foi preso por rolar três vezes o mesmo número.` });
                    } else {
                        const currentHouse = game.board.movePawn(player, totalRoll);
                        currentHouse.visit(player, game.bank, io);
                        io.emit('updatePositions', game.board.positions);
                        io.emit('diceResult', { playerId: socket.id, diceValues, totalRoll });
                        rollAndMove();
                    }
                } else {
                    player.double_counter = 0;
                    const currentHouse = game.board.movePawn(player, totalRoll);
                    currentHouse.visit(player, game.bank);
                    io.emit('updatePositions', game.board.positions);
                    io.emit('diceResult', { playerId: socket.id, diceValues, totalRoll });
                }
            };

            rollAndMove();
        }
    }

    static bankPayment(io, socket, game, amount) {
        const player = this.findPlayer(game, socket);
        if (player) {
            game.bank.giveMoney(player, amount);
            io.emit('bankPaymentSuccess', { playerId: socket.id, amount });
        }
    }

    static bankCollection(io, socket, game, amount) {
        const player = this.findPlayer(game, socket);
        if (player) {
            if (game.bank.collectMoney(player, amount)) {
                io.emit('bankCollectionSuccess', { playerId: socket.id, amount });
            } else {
                io.emit('bankCollectionFailed', { playerId: socket.id, amount });
            }
        }
    }

    static buyProperty(io, socket, game) {
        const player = this.findPlayer(game, socket);
        if (player) {
            currentHouse = game.board.currentHouse;
            if (currentHouse.buy(player, game.bank)) {
                io.emit('housePurchaseSuccess')
            } else {
                io.emit('housePurchaseFailed')
            }
        }
    }

    static buyHotel(io, socket, game) {
        const player = this.findPlayer(game, socket);
        if (player) {

        }
    }

    static buyLittleHouse(io, socket, game) {
        const player = this.findPlayer(game, socket);
        if (player) {
            currentHouse = game.board.currentHouse;
            if (currentHouse.buyLittleHouse(player, game.bank)) {
                io.emit('littleHousePurchaseSuccess')
            } else {
                io.emit('littleHousePurchaseFailed')
            }
        }
    }
}

export default GameController;
