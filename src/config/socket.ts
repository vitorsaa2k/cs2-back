import { Server as Socket } from "socket.io";
import { Server, IncomingMessage, ServerResponse } from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { expressSession } from "./session";
import { handleOnlineUsers } from "../socketHelpers/handleOnlineUsers";

let io: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export default (
	server?: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
	if (server) {
		io = new Socket(server, {
			cors: {
				origin: ["http://localhost:5173", "https://skinsmania.vercel.app"],
				credentials: true,
			},
		});
		io.engine.use(expressSession);
		io.on("connection", handleOnlineUsers);
	}
	return io;
};
