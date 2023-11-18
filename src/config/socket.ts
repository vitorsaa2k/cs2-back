import { Server } from "socket.io";


const io = new Server({
	cors: {
		origin: ['http://localhost:5173']
	}
});

let totalUsers = 0

io.on("connection", (socket) => {
  totalUsers++
  io.emit('usercount', totalUsers)
  socket.on('disconnect', () => {
    totalUsers--
    io.emit('usercount', totalUsers)
  })
});

export {io}
