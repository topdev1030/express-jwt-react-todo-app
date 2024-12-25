import { UserEntity } from "../entities";

export type PayloadType = {
	id: string;
};

export type PayloadForToken = {
	id: string;
	email: string;
	username: string;
};

export type CreateTitleType = {
	title: string;
	userId: UserEntity;
};
