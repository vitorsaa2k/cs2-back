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
	setInterval(() => {
		io().emit("usercount", Object.keys(users));
	}, 3000);
	socket.on("sendOnlineUser", () => {
		const userId = socket.request.session.passport?.user?.id;
		if (userId) {
			users[`${userId}`] = userId;
		}
	});
	socket.on("disconnect", () => {
		const userId = socket.request.session.passport?.user?.id;
		if (userId) {
			delete users[`${userId}`];
		}
	});
}

export { handleOnlineUsers };
