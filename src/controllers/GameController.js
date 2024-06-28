// src/server/controllers/GameController.js
import { Player } from '../models/Player.js';
import { Jail } from '../models/Houses/Jail.js';
import { Board } from '../models/Board.js';
import { Pawn } from '../models/Pawn.js';
import { GroupOfProperties } from '../models/GroupOfProperties.js';
import { Residential } from '../models/Houses/Properties/Residential.js';

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

    static intializeBoard(io, socket, game) {
        game.board = Board.get_instance();
        game.players.forEach(player => {
            pawn = new Pawn(player);
            game.board.positions.push({ pawn: pawn, position: 0 });
        });

        // Criar grupos de propriedades
        redGroup = new GroupOfProperties("red");
        greenGroup = new GroupOfProperties("green");
        blueGroup = new GroupOfProperties("blue");
        purpleGroup = new GroupOfProperties("purple");
        brownGroup = new GroupOfProperties("brown");
        yellowGroup = new GroupOfProperties("yellow");
        orangeGroup = new GroupOfProperties("orange");
        skyBlueGroup = new GroupOfProperties("skyBlue");

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



        start = new Start(200);
        taxN = new TaxHouse(300);
        taxL = new TaxHouse(450);
        sorte = new ChanceHouse();
        sorte2 = Object.assign({}, sorte);
        sorte3 = Object.assign({}, sorte);
        prison = new GoToJail();
        jail = new Jail();
        service1 = new Service("Ampla", 150, 75, 4);
        service2 = new Service("Águas do Rio", 150, 75, 4);
        station1 = new Station("Metro", 250, 50);
        station2 = new Station("VLT", 250, 50);
        station3 = new Station("BRT", 250, 50);
        station4 = new Station("Terminal", 250, 50);

        board.houses = [
            start,
            brownGroup.residential[0],
            brownGroup.residential[1],
            taxN,
            station1,
            skyBlueGroup.residential[0],
            sorte,
            skyBlueGroup.residential[1],
            skyBlueGroup.residential[2],
            jail,
            purpleGroup.residential[0],
            service1,
            purpleGroup.residential[0],
            purpleGroup.residential[1],
            station2,
            orangeGroup.residential[0],
            orangeGroup.residential[1],
            orangeGroup.residential[2],
            null,//parking lot
            redGroup.residential[0],
            sorte2,
            redGroup.residential[1],
            redGroup.residential[2],
            station3,
            yellowGroup.residential[0],
            yellowGroup.residential[1],
            service2,
            yellowGroup.residential[2],
            prison,
            greenGroup.residential[0],
            greenGroup.residential[1],
            greenGroup.residential[2],
            station4,
            sorte3,
            blueGroup.residential[0],
            taxL,
            blueGroup.residential[1],
        ];
        io.emit('boardInitialized', { houses: board.houses, positions: board.positions })
        print(board.houses);
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
