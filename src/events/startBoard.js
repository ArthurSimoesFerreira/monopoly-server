import GameController from "../controllers/GameController.js"

export function handleStartBoard(io, socket, game) {
    socket.on("startBoard", () => {
        GameController.startBoard(io, socket, game)
    })
}