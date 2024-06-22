// src/events/index.js
import { handleRollDice } from './rollDice.js';
import { handlePlayerConnection } from './playerConnection.js';
import { handleTransaction } from './transaction.js';
import { handleBankPayment } from './bankPayment.js';
import { handleBankCollection } from './bankCollection.js';
import { handleBuyHouse } from './buyHouse.js';
import { handleBuyHotel } from './buyHotel.js';

export function setupSocketEvents(io, socket, game) {
    handleRollDice(io, socket, game);
    handlePlayerConnection(io, socket, game);
    handleTransaction(io, socket, game);
    handleBankPayment(io, socket, game);
    handleBankCollection(io, socket, game);
    handleBuyHouse(io, socket, game);
    handleBuyHotel(io, socket, game);
}
