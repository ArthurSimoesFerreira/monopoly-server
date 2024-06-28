// src/events/index.js
import { handleRollDice } from './rollDice.js';
import { handlePlayerConnection } from './playerConnection.js';
import { handleBankPayment } from './bankPayment.js';
import { handleBankCollection } from './bankCollection.js';
import { handleBuyProperty } from './buyProperty.js';
import { handleBuyHotel } from './buyHotel.js';
import { handleInitializeBoard } from './initializeBoard.js';

export function setupSocketEvents(io, socket, game) {
    handleRollDice(io, socket, game);
    handlePlayerConnection(io, socket, game);
    handleBankPayment(io, socket, game);
    handleBankCollection(io, socket, game);
    handleBuyProperty(io, socket, game);
    handleBuyHotel(io, socket, game);
    handleInitializeBoard(io, socket, game);
}
