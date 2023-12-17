import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import io from "../config/socket";
let users: { [key: string]: string | undefined } = {};

function handleOnlineUsers(
	socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
	const userId = socket.request.session.passport?.user?.id;
	if (userId) {
		users[`${userId}`] = userId;
	}
	io().emit("usercount", Object.keys(users));
	socket.on("disconnect", () => {
		const userId = socket.request.session.passport?.user?.id;
		if (userId) {
			delete users[`${userId}`];
		}
	});
}

export { handleOnlineUsers };
