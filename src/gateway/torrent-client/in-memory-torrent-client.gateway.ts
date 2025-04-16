import { DownloadStatus } from "../../dto/download";
import type {
	BaseTorrentClientGateway,
	BaseTorrentClientGatewayGetOutput,
} from "./base-torrent-client.gateway";

export class InMemoryTorrentClientGateway implements BaseTorrentClientGateway {
	async add(): Promise<void> {
		await Promise.resolve();
	}

	async get(): Promise<BaseTorrentClientGatewayGetOutput> {
		return Promise.resolve({
			status: DownloadStatus.PENDING,
			path: "/",
		});
	}
}
