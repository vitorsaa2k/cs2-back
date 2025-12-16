export type UserType = {
	provider: string;
	id: string;
	emails: {
		value: String;
		verified: Boolean;
	}[];
	displayName: string;
	photo: string;
	balance: number;
};
