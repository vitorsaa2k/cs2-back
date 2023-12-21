import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { recentItems, bestSkins } from "../helpers/handleLiveDrop";

function liveDrop(
	socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
	socket.emit("updateLiveDrop", { skinList: recentItems, bestSkins });
}

export { liveDrop };
