const http = require("node:http");
const socketIO = require("socket.io");
const app = require("./app");
const server = http.createServer(app);
const DatabaseConnection = require("./src/database/database");
const workSocket = require("./src/socket/workSocket");
const port = process.env.PORT;
DatabaseConnection();

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  workSocket(io, socket);
});

server.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
