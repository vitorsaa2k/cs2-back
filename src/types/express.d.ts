import { UserType } from "./userTypes";

declare module "http" {
	interface IncomingMessage {
		rawBody: any;
		user: UserType | undefined;
		session: any;
	}
}
