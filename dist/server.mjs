import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer);
    io.on("connection", (socket) => {
        socket.on("joinRoom", ({ room, userName }) => {
            socket.join(room);
            console.log(`${userName} joined room: ${room}`);
            console.log("Current rooms for this socket:", socket.rooms);
            // Notify others in the room only
            socket.to(room).emit("user_joined", {
                sender: "System",
                message: `${userName} has joined the room.`,
            });
        });
        socket.on("message", ({ room, message, sender }) => {
            console.log(`Message from ${sender} in room ${room}: ${message}`);
            socket.to(room).emit("message", { sender, message });
        });
    });
    httpServer
        .once("error", (err) => {
        console.error(err);
        process.exit(1);
    })
        .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
