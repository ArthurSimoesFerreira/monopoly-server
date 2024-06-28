import GameController from "../controllers/GameController.js"

export function handleInitializeBoard(io, socket, game) {
    socket.on("initializeBoard", () => {
        GameController.intializeBoard(io, game)
    })
}