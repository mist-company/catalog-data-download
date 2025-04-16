import type { Torrent } from "../../dto/torrent";
import type {
	BaseTorrentGateway,
	BaseTorrentGatewayGetInput,
	BaseTorrentGatewayListInput,
} from "./base-torrent.gateway";

export class InMemoryTorrentGateway implements BaseTorrentGateway {
	torrents: Map<string, Torrent> = new Map();

	async update(torrent: Torrent): Promise<void> {
		this.torrents.set(torrent.infoHash, torrent);
		await Promise.resolve();
	}

	get(input: BaseTorrentGatewayGetInput): Promise<Torrent> {
		const torrent = this.torrents.get(input.infoHash);
		if (!torrent) {
			throw new Error(`Torrent with infoHash ${input.infoHash} not found`);
		}
		return Promise.resolve(torrent);
	}

	async list(input: BaseTorrentGatewayListInput): Promise<Torrent[]> {
		const torrents = Array.from(this.torrents.values()).filter((torrent) => {
			if (input.imdbId && torrent.imdbId.isEqual(input.imdbId)) {
				return false;
			}
			if (input.infoHash && torrent.infoHash !== input.infoHash) {
				return false;
			}
			return true;
		});
		return Promise.resolve(torrents);
	}
}
