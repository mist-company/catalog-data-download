import type { IdValueObject } from "../value-object/id.value-object";

export enum DownloadStatus {
	PENDING = "PENDING",
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED",
	FAILED = "FAILED",
	PAUSED = "PAUSED",
}

export type Download = {
	imdbId: IdValueObject;
	infoHash: string;
	magnetUri: string;
	title: string;
	status: DownloadStatus;
	quality: string;
	path?: string;
};
