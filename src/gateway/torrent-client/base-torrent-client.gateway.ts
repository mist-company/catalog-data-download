import type { DownloadStatus } from "../../dto/download";

export type BaseTorrentClientGatewayGetOutput = {
	status: DownloadStatus;
	path: string;
};

export interface BaseTorrentClientGateway {
	add(magnetUri: string): Promise<void>;
	get(infoHash: string): Promise<BaseTorrentClientGatewayGetOutput>;
}

export const BaseTorrentClientGateway = Symbol("BaseTorrentClientGateway");
