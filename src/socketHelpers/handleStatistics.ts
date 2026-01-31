import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { statisticsService } from "../services/statisticsService";

let intervalStarted = false;

function setupStatistics(io: Server) {
	if (intervalStarted) return;
	intervalStarted = true;

	const sendStatistics = async () => {
		try {
			const stats = await statisticsService.getStatistics();
			io.emit("statistics", stats);
		} catch (error) {
			console.error("Error sending statistics:", error);
		}
	};

	setInterval(sendStatistics, 30000);
}

function handleStatistics(
	socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) {
	statisticsService.getStatistics().then(stats => {
		socket.emit("statistics", stats);
	});

	socket.on("refresh_statistics", async () => {
		const stats = await statisticsService.getStatistics();
		socket.emit("statistics", stats);
	});
}

export { handleStatistics, setupStatistics };
