import { IncomingMessage, ServerResponse } from "http";

function rawBodySaver(
	req: IncomingMessage,
	res: ServerResponse,
	buf: Buffer,
	encoding: BufferEncoding
) {
	if (buf && buf.length) {
		req.rawBody = buf;
	}
}

export { rawBodySaver };
