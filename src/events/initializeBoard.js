import GameController from "../controllers/GameController.js"

export function handleInitializeBoard(io, socket, game) {
    socket.on("startBoard", () => {
        GameController.intializeBoard(io, socket, game)
    })
}